const orignalList = [
  "0 ab",
  "6 cd",
  "0 ef",
  "6 gh",
  "4 ij",
  "0 ab",
  "6 cd",
  "0 ef",
  "6 gh",
  "0 ij",
  "4 that",
  "3 be",
  "0 to",
  "1 be",
  "5 question",
  "1 or",
  "2 not",
  "4 is",
  "2 to",
  "4 the",
];

/*
{
  numericalPart,
  alphabeticalPart,
  orignalIndex
}
*/

const splitedList = orignalList.map((item, index) => {
  const [numericalPart, alphabeticalPart] = item.split(" ");

  let obj = {
    orignalIndex: index,
    numericalPart,
    alphabeticalPart,
  };

  return obj;
});

const sortedList = splitedList.sort(
  (a, b) => parseInt(a.numericalPart) - parseInt(b.numericalPart)
);

let theDashedString = "";

sortedList.map((item) => {
  if (item.orignalIndex < 10) {
    theDashedString += " - ";
  } else theDashedString += " " + item.alphabeticalPart + " ";
});

let orignalListelem = document.getElementById("orignal_list");
let sortedListelem = document.getElementById("sorted_list");
let dashedString = document.getElementById("dashed_string");

orignalList
  .map((item) => {
    let liElem = document.createElement("li");
    liElem.textContent = item;
    orignalListelem.append(liElem);
  })
  .join(" ");

sortedList
  .map((item) => {
    let liElem = document.createElement("li");
    liElem.textContent = item.numericalPart + " " + item.alphabeticalPart;
    sortedListelem.append(liElem);
  })
  .join(" ");

dashedString.textContent = theDashedString;
