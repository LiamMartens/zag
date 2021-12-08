import { Style } from "@ui-machines/types"
import { GroupMachineContext, MachineContext, Placement, Service, Type } from "./toast.types"

export function getToastsByPlacement(toasts: Service[]) {
  const result: Partial<Record<Placement, Service[]>> = {}

  for (const toast of toasts) {
    const placement = toast.state.context.placement!
    result[placement] ||= []
    result[placement]!.push(toast)
  }

  return result
}

export const defaultTimeouts: Record<Type, number> = {
  info: 5000,
  error: 5000,
  success: 2000,
  loading: Number.MAX_SAFE_INTEGER,
  custom: 5000,
}

export function getToastDuration(duration: number | undefined, type: MachineContext["type"]) {
  return duration ?? defaultTimeouts[type]
}

export function getGroupPlacementStyle(ctx: GroupMachineContext, placement: Placement): Style {
  const isRighty = placement.includes("right")
  const isLefty = placement.includes("left")

  const styles: Style = {
    position: "fixed",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    "--toast-gutter": ctx.spacingValue,
    zIndex: ctx.zIndex,
  }

  let alignItems: Style["alignItems"] = "center"
  if (isRighty) alignItems = "flex-end"
  if (isLefty) alignItems = "flex-start"

  styles.alignItems = alignItems

  if (placement.includes("top")) {
    const topOffset = ctx.offsets.top + "px"
    styles.top = `calc(env(safe-area-inset-top, 0px) + ${topOffset})`
  }

  if (placement.includes("bottom")) {
    const bottomOffset = ctx.offsets.bottom + "px"
    styles.bottom = `calc(env(safe-area-inset-bottom, 0px) + ${bottomOffset})`
  }

  if (!placement.includes("left")) {
    const rightOffset = ctx.offsets.right + "px"
    styles.right = `calc(env(safe-area-inset-right, 0px) + ${rightOffset})`
  }

  if (!placement.includes("right")) {
    const leftOffset = ctx.offsets.left + "px"
    styles.left = `calc(env(safe-area-inset-left, 0px) + ${leftOffset})`
  }

  return styles
}
