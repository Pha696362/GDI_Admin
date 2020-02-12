export const StatusObj = {
  DISABLED: { key: 0, text: "Disabled" },
  ACTIVE: { key: 1, text: "Active" },
};

export const BOOK_OPTIONS = [
  { key: 2, text: "Top Rating", route: "RATING" },
  { key: 3, text: "New Arrival", route: "NEW_ARRIVAL" },
  { key: 4, text: "Best Novel", route: "BEST_NOVEL" },
  { key: 5, text: "Top Free", route: "FREE" },
]

export const BOOK_STATUS = [
  { key: 1, text: "Completed" },
  { key: 2, text: "Progress" },
]

export const MOBILE_ADVERTISEMENT_TYPE = [
  { key: 1, text: "Article Scroll" },
  { key: 2, text: "Under Title Detail Page" },
  { key: 3, text: "Below Pharagraph Page Detail" },
  { key: 4, text: "Footer" },
]

export const WEB_ADVERTISEMENT_TYPE = [
  { key: 1, text: "Header" },
  { key: 2, text: "Footer" },
  { key: 3, text: "Right Site Bar" },
  { key: 4, text: "Popup Home" },
  { key: 5, text: "Popup Detail" },
  { key: 6, text: "Under Title Detail Page" },
  { key: 7, text: "Below Image Detail Page" },
  { key: 8, text: "Center Paragraph" },
]

export const PAYMENT_TYPES = [
  // { key: 1, text: "Buy" },
  { key: 1, text: "Subscript" },
  { key: 2, text: "Free" },
]
export const Advertise_Status = [
  { key: 1, text: "Active" },
  { key: 2, text: "Disactive" },
  { key: 3, text: "Pending" },
  { key: 4, text: "Expired" },
]
export const Content_Status = [
  // { key: 1, text: "Buy" },
  { key: 1, text: "Publish" },
  { key: 2, text: "Disable" },
  { key: 3, text: "Pending" },
]

export const FILTER_OPTIONS = [
  { key: "phone", text: "Phone Number" },
  { key: "fullName", text: "Full Name" },
  { key: "firstName", text: "First Name" },
  { key: "lastName", text: "Last Name" },
];

export const PAY_STATUS = {
  paid: { key: 1, text: 'Paid' },
  unpaid: { key: 2, text: 'Unpaid' },
}

export const PERMISSION = [
    {
      name: "ABOUT",
      view: false,
      edit: false,

    }, {
      name: "CONTACT",
      view: false,
      edit: false,
    }, {
      name: "CONTENT",
      view: false,
      create: false,
      edit: false,
      delete: false
    }, {
      name: "CATEGORY",
      view: false,
      create: false,
      edit: false,
      delete: false
    }, {
      name: "SUB CATEGORY",
      view: false,
      create: false,
      edit: false,
      delete: false
    }, {
      name: "MOBILE ADVERTISEMENT",
      view: false,
      create: false,
      edit: false,
      delete: false
    },{
      name: "WEB ADVERTISEMENT",
      view: false,
      create: false,
      edit: false,
      delete: false
    },{
      name: "PACKAGES",
      view: false,
      create: false,
      edit: false,
      delete: false
    },
    {
      name: "ROLE",
      view: false,
      create: false,
      edit: false,
      delete: false
    },
    {
      name: "USERS",
      view: false,
      create: false,
      edit: false,
      delete: false
    },
    {
      name: "GALLERY",
      view: false,
      create: false,
      edit: false,
      delete: false
    }
  ];
