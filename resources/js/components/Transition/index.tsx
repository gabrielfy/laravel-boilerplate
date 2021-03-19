/**
 * From: https://github.com/estevanmaito/windmill-react-ui/blob/master/src/Transition.tsx
 * References: https://gist.github.com/adamwathan/e0a791aa0419098a7ece70028b2e641e
 */
import React, { useContext, useEffect, useRef, createContext } from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

type TransitionContext = {
  parent: {
    appear?: string
    show?: boolean
    isInitialRender?: boolean
  }
}
const transitionContext = createContext<TransitionContext>({
  parent: {}
})

function useIsInitialRender() {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

type TransitionProps = {
  children?: React.ReactNode
  show?: boolean
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  appear?: any
}

const CSSTransition = ({
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear,
  children
}: TransitionProps) => {
  const enterClasses = enter.split(' ').filter((s) => s.length)
  const enterFromClasses = enterFrom.split(' ').filter((s) => s.length)
  const enterToClasses = enterTo.split(' ').filter((s) => s.length)
  const leaveClasses = leave.split(' ').filter((s) => s.length)
  const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length)
  const leaveToClasses = leaveTo.split(' ').filter((s) => s.length)

  function addClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.add(...classes)
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.remove(...classes)
  }

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={(node: HTMLElement, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      onEnter={(node: HTMLElement) => {
        addClasses(node, [...enterClasses, ...enterFromClasses])
      }}
      onEntering={(node: HTMLElement) => {
        removeClasses(node, enterFromClasses)
        addClasses(node, enterToClasses)
      }}
      onEntered={(node: HTMLElement) => {
        removeClasses(node, [...enterToClasses, ...enterClasses])
      }}
      onExit={(node: HTMLElement) => {
        addClasses(node, [...leaveClasses, ...leaveFromClasses])
      }}
      onExiting={(node: HTMLElement) => {
        removeClasses(node, leaveFromClasses)
        addClasses(node, leaveToClasses)
      }}
      onExited={(node: HTMLElement) => {
        removeClasses(node, [...leaveToClasses, ...leaveClasses])
      }}
    >
      {children}
    </ReactCSSTransition>
  )
}

const Transition = ({ show, appear, ...props }: TransitionProps) => {
  const { parent } = useContext(transitionContext)
  const isInitialRender = useIsInitialRender()
  const isChild = show === undefined

  if (isChild) {
    return (
      <CSSTransition appear={parent.appear} show={parent.show} {...props} />
    )
  } else
    return (
      <transitionContext.Provider
        value={{
          parent: {
            show,
            isInitialRender,
            appear
          }
        }}
      >
        <CSSTransition appear={appear} show={show} {...props} />
      </transitionContext.Provider>
    )
}

export default Transition
