export const priorities = [
  {
    key: "None",
    value: 0
  },
  {
    key: "Low",
    value: 1
  },
  {
    key: "Medium",
    value: 2
  },
  {
    key: "High",
    value: 3
  }
]

export const convertPriorityLevelKeyToValue = (key: string): number => {
  switch (key) {
    case "None":
      return 0
    case "Low":
      return 1
    case "Medium":
      return 2
    default:
      return 3
  }
}
