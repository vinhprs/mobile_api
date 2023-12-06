const splitTeacher = (title: string) => {
    const teacherName = title.substring(title.lastIndexOf('-'), title.length);
    return teacherName;
}

const formatMoney = (number: number) => {
    let formattedNumber = number
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedNumber;
}

export const helpers = { 
  splitTeacher,
  formatMoney
}