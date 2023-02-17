export const colours = [
  {
    "key": "white",
    "value": 101
  },
  {
    "key": "red",
    "value": 102
  },
  {
    "key": "orange",
    "value": 103
  },
  {
    "key": "yellow",
    "value": 104
  },
  {
    "key": "green",
    "value": 105
  },
  {
    "key": "blue",
    "value": 106
  },
  {
    "key": "purple",
    "value": 107
  },
  {
    "key": "grey",
    "value": 108
  }
]

export const convertColourKeyToValue = (key: string): number => {
  switch (key) {
    case "white":
      return 101;
    case "red":
      return 102;
    case "orange":
      return 103;
    case "yellow":
      return 104;
    case "green":
      return 105;
    case "blue":
      return 106;
    case "purple":
      return 107;
    default:
      return 108
  }
}
