export function uuid() {
  return Math.random().toString(16).slice(2)
}

export const settings = {
  currency: 'руб',
  places: [
    {
      name: 'indoors',
      label: 'Внутренняя уборка',
      price: 33000,
    },
    {
      name: 'outdoors',
      label: 'Уборка территории',
      price: 53000,
    },
    {
      name: 'partTime',
      label: 'График 5/7',
      price: 63000,
    },
  ],
}

export const options = [
  {
    label: 'Без химии',
    price: 33000,
    pricePrefix: null,
    useField: true,
    readOnly: true,
  },
  {
    label: 'С химией',
    price: 2700,
    pricePrefix: '+',
    useField: false,
    readOnly: false,
  },
]

export const devices = [
  {
    label: 'Инвентарь',
    price: 2300,
    pricePrefix: '+',
    useField: false,
  },
  {
    label: 'Пылесос',
    price: 3500,
    pricePrefix: '+',
    useField: false,
  },
  {
    label: 'Ротор',
    price: 4700,
    pricePrefix: '+',
    useField: false,
  },
  {
    label: 'Поломоечная',
    price: 20000,
    pricePrefix: '+',
    useField: false,
  },
  {
    label: 'Другая техника',
    price: 17000,
    pricePrefix: null,
    useField: false,
  },
]
