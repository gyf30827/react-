/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {FiberRoot} from './ReactInternalTypes';
import type {
  UpdateQueue as HookQueue,
  Update as HookUpdate,
} from './ReactFiberHooks.old';
import type {
  SharedQueue as ClassQueue,
  Update as ClassUpdate,
} from './ReactFiberClassUpdateQueue.old';
import type {Lane} from './ReactFiberLane.old';

import {warnAboutUpdateOnNotYetMountedFiberInDEV} from './ReactFiberWorkLoop.old';
import {mergeLanes} from './ReactFiberLane.old';
import {NoFlags, Placement, Hydrating} from './ReactFiberFlags';
import {HostRoot} from './ReactWorkTags';

// An array of all update queues that received updates during the current
// render. When this render exits, either because it finishes or because it is
// interrupted, the interleaved updates will be transferred onto the main part
// of the queue.
// 待处理的更新队列
let concurrentQueues: Array<HookQueue<any, any> | ClassQueue<any>> | null =
  null;

export function pushConcurrentUpdateQueue(
  queue: HookQueue<any, any> | ClassQueue<any>,
) {
  if (concurrentQueues === null) {
    concurrentQueues = [queue];
  } else {
    concurrentQueues.push(queue);
  }
}

//  如果存在待更新的队列 将待更新队列 里面的 queue 的 interleaved 追加到 pending 队尾
export function finishQueueingConcurrentUpdates() {
  // Transfer the interleaved updates onto the main queue.
  // 每个queue 都有 pending 和 interleaved 两个字段 当他们不为空时
  // Each queue has a `pending` field and an `interleaved` field. When they are not null
  // they point to the last node in a circular linked list.
  // 我们需要将 interleaved list 合并到  pending list 队位 形成单环链表
  // We need to append the interleaved list to the end of the pending list by joining them into a
  // single, circular list.
  if (concurrentQueues !== null) {
    for (let i = 0; i < concurrentQueues.length; i++) {
      const queue = concurrentQueues[i];
      const lastInterleavedUpdate = queue.interleaved;
      if (lastInterleavedUpdate !== null) {
        queue.interleaved = null;
        const firstInterleavedUpdate = lastInterleavedUpdate.next;
        const lastPendingUpdate = queue.pending;
        if (lastPendingUpdate !== null) {
          const firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = (firstInterleavedUpdate: any);
          lastInterleavedUpdate.next = (firstPendingUpdate: any);
        }
        queue.pending = (lastInterleavedUpdate: any);
      }
    }
    concurrentQueues = null;
  }
}

export function enqueueConcurrentHookUpdate<S, A>(
  fiber: Fiber,
  queue: HookQueue<S, A>,
  update: HookUpdate<S, A>,
  lane: Lane,
) {
  const interleaved = queue.interleaved;
  if (interleaved === null) {
    // This is the first update. Create a circular list.
    update.next = update;
    // At the end of the current render, this queue's interleaved updates will
    // be transferred to the pending queue.
    pushConcurrentUpdateQueue(queue);
  } else {
    // 将 新增加的 update 排列到 interleaved 队头
    update.next = interleaved.next;
    interleaved.next = update;
  }
  // 将queue 的 interleaved 指向 update
  queue.interleaved = update;
  // 将此次lane 合并到根节点上
  return markUpdateLaneFromFiberToRoot(fiber, lane);
}

export function enqueueConcurrentHookUpdateAndEagerlyBailout<S, A>(
  fiber: Fiber,
  queue: HookQueue<S, A>,
  update: HookUpdate<S, A>,
  lane: Lane,
): void {
  const interleaved = queue.interleaved;
  if (interleaved === null) {
    // This is the first update. Create a circular list.
    update.next = update;
    // At the end of the current render, this queue's interleaved updates will
    // be transferred to the pending queue.
    pushConcurrentUpdateQueue(queue);
  } else {
    update.next = interleaved.next;
    interleaved.next = update;
  }
  queue.interleaved = update;
}

export function enqueueConcurrentClassUpdate<State>(
  fiber: Fiber,
  queue: ClassQueue<State>,
  update: ClassUpdate<State>,
  lane: Lane,
) {
  const interleaved = queue.interleaved;
  if (interleaved === null) {
    // This is the first update. Create a circular list.
    update.next = update;
    // At the end of the current render, this queue's interleaved updates will
    // be transferred to the pending queue.
    pushConcurrentUpdateQueue(queue);
  } else {
    update.next = interleaved.next;
    interleaved.next = update;
  }
  queue.interleaved = update;

  return markUpdateLaneFromFiberToRoot(fiber, lane);
}

export function enqueueConcurrentRenderForLane(fiber: Fiber, lane: Lane) {
  return markUpdateLaneFromFiberToRoot(fiber, lane);
}

// Calling this function outside this module should only be done for backwards
// compatibility and should always be accompanied by a warning.
export const unsafe_markUpdateLaneFromFiberToRoot =
  markUpdateLaneFromFiberToRoot;

function markUpdateLaneFromFiberToRoot(
  sourceFiber: Fiber,
  lane: Lane,
): FiberRoot | null {
  // 更新fiber节点的lane
  // Update the source fiber's lanes
  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
  let alternate = sourceFiber.alternate;
  // 更新缓存fiber
  if (alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, lane);
  }
  if (__DEV__) {
    if (
      alternate === null &&
      (sourceFiber.flags & (Placement | Hydrating)) !== NoFlags
    ) {
      warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
    }
  }
  // 更新所有父节点的 childLans
  // Walk the parent path to the root and update the child lanes.
  let node = sourceFiber;
  let parent = sourceFiber.return;
  while (parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane);
    alternate = parent.alternate;
    if (alternate !== null) {
      alternate.childLanes = mergeLanes(alternate.childLanes, lane);
    } else {
      if (__DEV__) {
        if ((parent.flags & (Placement | Hydrating)) !== NoFlags) {
          warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
        }
      }
    }
    node = parent;
    parent = parent.return;
  }
  if (node.tag === HostRoot) {
    const root: FiberRoot = node.stateNode;
    return root;
  } else {
    return null;
  }
}
