const pageSize = {
  height: "29.62cm",
  width: "21.01cm",
};

const div = document.getElementById("cv");

let elements = [];
let data = {};
let spans = [];
let currentPageIndex = 0;
let pages = [];
let parts = [];
let fragment = [];
const inlineSpans = [
  "country",
  "company",
  "toMonth",
  "toYear",
  "fromMonth",
  "fromYear",
  "isContinue",
  "cityState",
];
const ignoreList = ["styles"];

const components = {
  shortName: {
    styles: "",
    tag: "span",
  },
  name: {
    styles: "",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles: "",
  },
  contact: {
    styles: "",
    elements: [
      {
        id: "phone",
        styles: "",
        tag: "span",
      },
      {
        id: "email",
        styles: "",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles: "",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "",
    tag: "span",
  },
  summary: { styles: "", tag: "span" },
  workExperienceArray: {
    styles: "",
    elements: [
      {
        id: "title",
        styles: "",
        tag: "span",
      },
      {
        styles: "",
        tag: "div",
        container: [
          { id: "cityState", styles: "", tag: "span" },
          { id: "country", styles: "", tag: "span" },
          { id: "company", styles: "", tag: "span" },
          { id: "fromMonth", styles: "", tag: "span" },
          { id: "fromYear", styles: "", tag: "span" },
          { id: "toMonth", styles: "", tag: "span" },
          { id: "toYear", styles: "", tag: "span" },
          { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      { id: "achievements", styles: "", tag: "span" },
    ],
  },
  education: {
    styles: "",
    elements: [
      { id: "educationLevel", styles: "", tag: "span" },
      { id: "fieldOfStudy", styles: "", tag: "span" },
      { id: "schoolName", styles: "", tag: "span" },
      { id: "schoolLocation", styles: "", tag: "span" },
      {
        styles: "",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "", tag: "span" },
          { id: "fromYear", styles: "", tag: "span" },
          { id: "toMonth", styles: "", tag: "span" },
          { id: "toYear", styles: "", tag: "span" },
          { id: "isContinue", styles: "", tag: "span" },
        ],
      },
    ],
  },
};

const layout = {
  styles: "w-full",
  fragment: {
    styles: "flex flex-1 flex-row bg-white container mx-auto",
    sideBar: {
      styles: "bg-[#e2e2e2] w-3/12 flex flex-col justify-start items-start",
      elements: [
        {
          id: "shortName",
        },
        {
          id: "phone",
        },
        {
          id: "email",
        },
        {
          id: "linkedin",
        },
        {
          id: "primarySkills",
        },
      ],
    },

    body: {
      styles:
        "bg-red text-white w-9/12 flex flex-col justify-start items-start",
      elements: [
        {
          id: "name",
        },
        {
          id: "jobTitle",
        },
        {
          id: "summary",
        },
        {
          id: "workExperienceArray",
        },
        {
          id: "education",
        },
      ],
    },
  },
};

function getRandomHexCode() {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  //   return color;
  return "#fff";
}
const generateElements = (element, tag) => {
  let elem = document.createElement("span");
  elem.id = element.id;
  elem.textContent = element.id;
  return elem;
};

const newPage = () => {
  const div = document.createElement("div");
  div.classList.add("page");
  div.id = "page-" + pages.length;
  pages.push(div);
  return div;
};

const formPage = (page) => {
  layout.styles.split(" ").map((cls) => page.classList.add(cls));
  console.log(parts);
  parts.map((part) => {
    if (typeof part === "object" && !Array.isArray(part)) {
      const [[partName, partElem]] = Object.entries(part);
      page.append(partElem);
    } else if (Array.isArray(part)) {
      let container = document.createElement("div");
      layout.fragment.styles
        .split(" ")
        .map((cls) => container.classList.add(cls));
      console.log(part);
      part.map((item) => {
        const [[partName, partElem]] = Object.entries(item);
        console.log(partElem);
        container.append(partElem);
      });
      console.log(container);
      page.append(container);
    } else {
    }
  });
  cv.append(page);
};

const createElementsNew = (obj) => {
  const [key, value] = obj;
  //   append the attribute to the elements

  let template = components[key];

  let attr = [{ name: key }];
  //   if the value is a object
  if (typeof value === "object" && !Array.isArray(value)) {
    if (template.elements) {
      for (const element of template.elements) {
        if (value.hasOwnProperty(element.id) && value[element.id] !== "") {
          const _element = document.createElement(element.tag);
          setAttributesToElem(attr, _element);
          setAttributesToElem([{ name: element.id }], _element);
          _element.textContent = value[element.id];
          spans.push(_element);
        }
      }
    }
  }

  //   if the value is an array
  if (Array.isArray(value)) {
    let i = 1;
    for (const singleItem of value) {
      let newAttr = [];
      if (typeof singleItem === "object" && !Array.isArray(singleItem)) {
        if (template.elements) {
          for (const element of template.elements) {
            if (
              singleItem.hasOwnProperty(element.id) &&
              singleItem[element.id] !== ""
            ) {
              if (Array.isArray(singleItem[element.id])) {
                let k = 1;
                for (const singleAchievement of singleItem[element.id]) {
                  newAttr.push({ [`${key}-${element.id}-${i}-index`]: k });
                  const _element = document.createElement(element.tag);
                  setAttributesToElem(attr, _element);
                  setAttributesToElem(
                    [{ [`${key}-index`]: i }, { [`${element.id}-index`]: k }],
                    _element
                  );
                  _element.textContent = singleAchievement;
                  spans.push(_element);
                  k++;
                }
              } else {
                const _element = document.createElement(element.tag);
                setAttributesToElem(attr, _element);
                setAttributesToElem(
                  [{ [`${key}-${element.id}-index`]: i }],
                  _element
                );
                _element.textContent = singleItem[element.id];
                spans.push(_element);
              }
            } else {
              if (element.container) {
                const container_element = document.createElement(element.tag);
                setAttributesToElem(attr, container_element);
                setAttributesToElem(
                  [{ [`${key}-container-index`]: i }],
                  container_element
                );
                for (const item of element.container) {
                  if (
                    singleItem.hasOwnProperty(item.id) &&
                    singleItem[item.id] !== ""
                  ) {
                    const singlespan = document.createElement(item.tag);
                    setAttributesToElem(attr, singlespan);
                    singlespan.textContent = singleItem[item.id];
                    container_element.append(singlespan);
                  }
                }
                spans.push(container_element);
              }
            }
          }
        }
      } else {
        newAttr.push({ [`${key}-index`]: i });
        const element = document.createElement(template.tag);
        setAttributesToElem(attr, element);
        setAttributesToElem(newAttr, element);
        element.textContent = singleItem;
        spans.push(element);
      }
      i++;
    }
  }
  //   if the value is a string
  else {
    const element = document.createElement(template.tag);
    setAttributesToElem(attr, element);
    setAttributesToElem(attr, element);
    element.textContent = value;
    spans.push(element);
  }
};

const isContentBleeding = () => {
  let id = "page-" + currentPageIndex;
  let page = document.getElementById(id);
  const isOverflowingVertically = page.scrollHeight > 1080;
  return isOverflowingVertically;
};

const wrapIn = (elems, name, index) => {
  const div = document.createElement("div");
  Array.from(elems).map((elem) => div.append(elem));
  setAttributesToElem([{ name: name }, { type: "inline-spans" }], div);
  return div;
};

setAttributesToElem = (attr, elem) => {
  attr.map((atr) => {
    const [[key, value]] = Object.entries(atr);
    elem.setAttribute(`data-${key}`, value);
  });
};

const getToNode = (span, attribute, page) => {
  //   debugger;
  for (const part of parts) {
    // if (typeof part === "object" && !Array.isArray(part)) {
    //   const [[key, value]] = Object.entries(part);
    //   const findChild = value.children[attribute];
    //   //   const currentPage = value.parentElement
    //     .getAttribute("id")
    //     .split("-")
    //     .pop();
    //   if (
    //     currentPageIndex > 0 &&
    //     findChild &&
    //     currentPageIndex == currentPage
    //   ) {
    //     value.appendChild(span);
    //     findChild.textContent = "";
    //     return;
    //   }
    //   if (currentPageIndex <= 0) {
    //   if (findChild) {
    //     value.replaceChild(span, value.children[attribute]);
    //     return;
    //   } else {
    //   }
    //   //   }
    // } else {
    //   if (currentPageIndex > 0) {
    //     //continue
    //   } else {
    for (const p of part) {
      const [[key, value]] = Object.entries(p);
      const findChild = value.children[attribute];
      if (findChild) {
        if (
          attribute === "primarySkills" ||
          attribute === "education" ||
          attribute === "workExperienceArray"
        ) {
          value.appendChild(span);
          findChild.textContent = "";
        } else value.replaceChild(span, value.children[attribute]);
        return;
      } else {
      }
      // }
      //   }
    }
  }
};

function* FinalizeGeneration(span, page) {
  const attribute = span.getAttribute("data-name");
  if (attribute) {
    getToNode(span, attribute, page);
  }
  //   else page.append(span);

  yield isContentBleeding();
}

const generateLayout = () => {
  for (let templatepart in layout) {
    if (templatepart === "styles") {
      //donot create a new element
    } else if (templatepart === "fragment") {
      for (let fragmentpart in layout[templatepart]) {
        if (fragmentpart === "styles") {
          //donot create a new element
        } else {
          const styles = layout[templatepart][fragmentpart].styles;
          let div = document.createElement("div");
          styles.split(" ").map((cls) => div.classList.add(cls));

          const _elements = layout[templatepart][fragmentpart].elements.map(
            (element) => generateElements(element, "span")
          );
          _elements.map((_element) => div.append(_element));

          //   div.style.background = getRandomHexCode();
          fragment.push({
            [fragmentpart]: div,
          });
        }
      }
      parts.push(fragment);
      fragment = [];
    } else {
      let div = document.createElement("div");
      const styles = layout[templatepart].styles;
      styles.split(" ").map((cls) => div.classList.add(cls));

      const _elements = layout[templatepart].elements.map((element) =>
        generateElements(element, "span")
      );

      _elements.map((_element) => div.append(_element));

      div.style.background = getRandomHexCode();

      parts.push({
        [templatepart]: div,
      });
    }
  }

  //   newPage();
};

fetch("./cv.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((jsonData) => {
    for (const item of Object.entries(jsonData)) {
      //   createElements(item);
      createElementsNew(item);
    }
    return spans;
  })
  .then((spans) => {
    spans.map((span) => {
      const gen = FinalizeGeneration(span, pages[currentPageIndex]);
      let { value, done } = gen.next();
      if (value) {
        // generateLayout();
        const page = newPage();
        currentPageIndex = pages.length - 1;
        formPage(page);
      }
    });
  })
  .catch((error) => console.error(error));

generateLayout();
const firstPage = newPage();
formPage(firstPage);
