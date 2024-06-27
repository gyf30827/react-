import { defaultNoopBatch as batch } from './batch.ts'

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

type VoidFunc = () => void

type Listener = {
  callback: VoidFunc
  next: Listener | null
  prev: Listener | null
}

function createListenerCollection() {
  let first: Listener | null = null
  let last: Listener | null = null

  return {
    clear() {
      first = null
      last = null
    },

    notify() {
      batch(() => {
        console.log('react-redux', 'listener', 'notify')
        let listener = first
        while (listener) {
          listener.callback()
          listener = listener.next
        }
      })
    },

    get() {
      const listeners: Listener[] = []
      let listener = first
      while (listener) {
        listeners.push(listener)
        listener = listener.next
      }
      return listeners
    },

    subscribe(callback: () => void) {
      let isSubscribed = true

      const listener: Listener = (last = {
        callback,
        next: null,
        prev: last,
      })
      if (listener.prev) {
        listener.prev.next = listener
      } else {
        first = listener
      }
      // 卸载函数，将 闭包中的 listener 从其链中删除
      return function unsubscribe() {
        if (!isSubscribed || first === null) return
        isSubscribed = false

        if (listener.next) {
          listener.next.prev = listener.prev
        } else {
          last = listener.prev
        }
        if (listener.prev) {
          listener.prev.next = listener.next
        } else {
          first = listener.next
        }
      }
    },
  }
}

type ListenerCollection = ReturnType<typeof createListenerCollection>

export interface Subscription {
  addNestedSub: (listener: VoidFunc) => VoidFunc
  notifyNestedSubs: VoidFunc
  handleChangeWrapper: VoidFunc
  isSubscribed: () => boolean
  onStateChange?: VoidFunc | null
  trySubscribe: VoidFunc
  tryUnsubscribe: VoidFunc
  getListeners: () => ListenerCollection
}

const nullListeners = {
  notify() {},
  get: () => [],
} as unknown as ListenerCollection

export function createSubscription(store: any, parentSub?: Subscription) {
  let unsubscribe: VoidFunc | undefined
  let listeners: ListenerCollection = nullListeners

  // Reasons to keep the subscription active
  let subscriptionsAmount = 0

  // Is this specific subscription subscribed (or only nested ones?)
  let selfSubscribed = false

  function addNestedSub(listener: () => void) {
    console.log(
      'react-redux',
      'subscription',
      'addNestedSub',
      // @ts-ignore
      subscription?.type
    )
    trySubscribe()

    const cleanupListener = listeners.subscribe(listener)

    // cleanup nested sub
    let removed = false
    return () => {
      if (!removed) {
        removed = true
        cleanupListener()
        tryUnsubscribe()
      }
    }
  }

  function notifyNestedSubs() {
    console.log(
      'react-redux',
      'subscription',
      'notifyNestedSubs',
      // @ts-ignore
      subscription?.type
    )
    listeners.notify()
  }

  function handleChangeWrapper() {
    console.log('redux', 'subscription', 'handleChangeWrapper')
    if (subscription.onStateChange) {
      subscription.onStateChange()
    }
  }

  function isSubscribed() {
    return selfSubscribed
  }

  function trySubscribe() {
    subscriptionsAmount++
    if (!unsubscribe) {
      /**
       * 将 handleChangeWrapper函数添加到 store的state change 事件
       *    如果存在传入的 parentSub 则执行 parentSub的订阅
       *    否则执行当前store的 订阅
       */
      unsubscribe = parentSub
        ? parentSub.addNestedSub(handleChangeWrapper)
        : store.subscribe(handleChangeWrapper)

      listeners = createListenerCollection()
    }
  }

  function tryUnsubscribe() {
    subscriptionsAmount--
    // 如果当前订阅器上已经不存在订阅事件，则会执行 store change 事件的取消订阅
    if (unsubscribe && subscriptionsAmount === 0) {
      unsubscribe()
      unsubscribe = undefined
      // 重置 listeners
      listeners.clear()
      listeners = nullListeners
    }
  }

  function trySubscribeSelf() {
    if (!selfSubscribed) {
      selfSubscribed = true
      trySubscribe()
    }
  }

  function tryUnsubscribeSelf() {
    if (selfSubscribed) {
      selfSubscribed = false
      tryUnsubscribe()
    }
  }

  const subscription: Subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe: trySubscribeSelf,
    tryUnsubscribe: tryUnsubscribeSelf,
    getListeners: () => listeners,
  }

  return subscription
}
