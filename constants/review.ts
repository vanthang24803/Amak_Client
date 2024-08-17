const statusReview = [
  {
    name: "Mới nhất",
    value: "Lasted",
  },
  {
    name: "Có hình ảnh",
    value: "Image",
  },
];

const starReview = [
  {
    name: "5 sao",
    value: 5,
  },
  {
    name: "4 sao",
    value: 4,
  },
  {
    name: "3 sao",
    value: 3,
  },
  {
    name: "2 sao",
    value: 2,
  },
  {
    name: "1 sao",
    value: 1,
  },
];

const starList: { [key: number]: string } = {
  5: "Tuyệt vời",
  4: "Hài lòng",
  3: "Bình thường",
  2: "Không hài lòng",
  1: "Tệ",
};

export { starReview, statusReview, starList };
