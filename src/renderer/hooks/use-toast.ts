"use client"

import React from "react"

export type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success"
  duration?: number
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 3000

type ToasterToastActionElement = React.ReactElement

export const reducer = (state: ToasterToast[], action: any): ToasterToast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.toast].slice(0, TOAST_LIMIT)

    case "UPDATE_TOAST":
      return state.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t))

    case "DISMISS_TOAST":
      return state.filter((t) => t.id !== action.toastId)

    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.toastId)

    default:
      return state
  }
}

const listeners: Array<(state: ToasterToast[]) => void> = []

let memoryState: ToasterToast[] = []

function dispatch(action: any) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

export function useToast() {
  const [state, setState] = React.useState<ToasterToast[]>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    toasts: state,
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          duration: props.duration || TOAST_REMOVE_DELAY,
        },
      })

      setTimeout(() => {
        dispatch({
          type: "REMOVE_TOAST",
          toastId: id,
        })
      }, props.duration || TOAST_REMOVE_DELAY)

      return {
        id,
        dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
        update: (props: ToasterToast) =>
          dispatch({
            type: "UPDATE_TOAST",
            toast: { ...props, id },
          }),
      }
    },
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}
