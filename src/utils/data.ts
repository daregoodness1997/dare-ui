export const data = [
  {
    id: 1,
    value: 'Value 1',
    name: 'Ademola Ojo',
    age: '56',
    location: 'Abuja',
    status: 'true',
    children: [
      {
        id: 2,
        value: 'Value 2',
        name: 'Yewande Ojo',
        age: '46',
        location: 'Lagos',
        status: 'false',

        children: [
          {
            id: 3,
            value: 'Value 3',
            name: 'Philips Ojo',
            age: '16',
            location: 'Abuja',
          },
          {
            id: 5,
            value: 'Value 3',
            name: 'Philips Ojo',
            age: '16',
            location: 'Abuja',
            children: [
              {
                id: 6,
                value: 'Value 3',
                name: 'Philips Ojo',
                age: '16',
                location: 'Abuja',
              },
              {
                id: 7,
                value: 'Value 3',
                name: 'Philips Ojo',
                age: '16',
                location: 'Abuja',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    value: 'Value 4',
    name: 'John Smiith',
    age: '36',
    location: 'London',
    status: 'true',
  },
];

export type ColumnType = {
  id: number;
  row: string;
  sort?: boolean;
  omit?: boolean;
};

export const columnSchema = [
  {
    id: 1,
    selector: 'Name',
    row: 'name',
    sort: true,
    omit: false,
  },
  {
    id: 2,
    selector: 'Age',
    row: 'age',
    sort: true,
    omit: false,
  },
  {
    id: 3,
    selector: 'Location',
    row: 'location',
    sort: true,
    omit: false,
  },
  {
    id: 4,
    selector: 'Status',
    row: 'status',
    sort: true,
    omit: false,
  },
  {
    id: 5,
    selector: 'Range',
    row: 'range',
    sort: true,
    omit: false,
  },
  {
    id: 6,
    selector: 'Pedigree',
    row: 'pedigree',
    sort: true,
    omit: false,
  },
];
