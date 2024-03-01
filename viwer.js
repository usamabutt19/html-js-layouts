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
let leftSpan = [];
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
    styles:
      "h-8 w-8 my-8 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
    tag: "span",
  },
  name: {
    styles: "text-4xl font-bold flex justify-center items-center w-full mb-2",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles: "text-base flex justify-center items-center w-full mb-2",
  },
  contact: {
    styles: "",
    elements: [
      {
        id: "phone",
        styles: "text-xs mt-2",
        tag: "span",
      },
      {
        id: "email",
        styles: "text-xs mt-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles: "text-xs mt-2",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "text-xs mt-2 before:content-['\\2022'] before:mr-2",
    tag: "span",
  },
  summary: { styles: "text-justify mb-4 text-xs", tag: "span" },
  workExperienceArray: {
    styles: "",
    elements: [
      {
        id: "title",
        styles: "text-base font-bold w-full",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-xs flex-wrap",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "", tag: "span" },
          { id: "fromYear", styles: "", tag: "span" },
          {
            id: "toMonth",
            styles: "before:content-['\\268A'] before:mr-1",
            tag: "span",
          },
          { id: "toYear", styles: "", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['\\2758'] before:mr-2 after:content-['\\2758'] after:ml-2",
            tag: "span",
          },
          { id: "cityState", styles: "", tag: "span" },
          { id: "country", styles: "", tag: "span" },
          // { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      {
        id: "achievements",
        styles:
          "text-xs text-justify pb-1 before:content-['\\2022'] before:mr-2",
        tag: "span",
      },
    ],
  },
  education: {
    tag: "div",
    styles: "",
    elements: [
      {
        tag: "div",
        styles: "bg-gray-200 flex flex-col w-[30%] p-4 rounded-md",
        container: [
          {
            id: "educationLevel",
            styles: "font-semibold text-base",
            tag: "span",
          },
          { id: "fieldOfStudy", styles: "text-xs font-semibold", tag: "span" },
          {
            id: "schoolName",
            styles: "italic text-xs font-normal",
            tag: "span",
          },
          {
            id: "schoolLocation",
            styles: "text-xs italic font-normal",
            tag: "span",
          },
          {
            styles: "flex flex-row gap-2 italic",
            tag: "div",
            container: [
              { id: "fromMonth", styles: "text-xs", tag: "span" },
              { id: "fromYear", styles: "text-xs", tag: "span" },
              {
                id: "toMonth",
                styles: "text-xs before:content-['\\268A'] before:mr-2",
                tag: "span",
              },
              { id: "toYear", styles: "text-xs", tag: "span" },
              // { id: "isContinue", styles: "", tag: "span" },
            ],
          },
        ],
      },
    ],
  },
};

const templateLayout = {
  styles: "w-full",
  fragment: {
    styles: "flex flex-row bg-white fragment",
    sideBar: {
      styles: "bg-[#e2e2e2] w-4/12 flex flex-col justify-start px-6",
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
        "text-black w-8/12 flex-1 flex flex-col justify-start items-start px-6 my-6",
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

// const components = {
//   shortName: {
//     styles:
//       "h-8 w-8 my-8 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
//     tag: "span",
//   },
//   name: {
//     styles: "text-4xl font-bold flex justify-center items-center w-full mb-2",
//     tag: "span",
//   },
//   jobTitle: {
//     tag: "span",
//     styles: "text-lg flex justify-center items-center w-full mb-2",
//   },
//   contact: {
//     styles: "flex-row justify-center items-center w-full",
//     elements: [
//       {
//         id: "phone",
//         styles: "text-sm mt-2",
//         tag: "span",
//       },
//       {
//         id: "email",
//         styles: "text-sm mt-2",
//         tag: "span",
//       },
//       {
//         id: "linkedIn",
//         styles: "text-sm mt-2",
//         tag: "span",
//       },
//     ],
//   },
//   primarySkills: {
//     styles: "text-sm px-5 py-3 bg-gray-300 rounded-full",
//     tag: "span",
//   },
//   summary: { styles: "text-justify mb-4 text-sm", tag: "span" },
//   workExperienceArray: {
//     styles: "my-2",
//     elements: [
//       {
//         id: "title",
//         styles: "text-lg font-bold",
//         tag: "span",
//       },
//       {
//         styles: "flex gap-1 font-semibold pb-2 text-sm flex-wrap",
//         tag: "div",
//         container: [
//           { id: "fromMonth", styles: "", tag: "span" },
//           { id: "fromYear", styles: "", tag: "span" },
//           {
//             id: "toMonth",
//             styles: "before:content-['\\268A'] before:mr-1",
//             tag: "span",
//           },
//           { id: "toYear", styles: "", tag: "span" },
//           {
//             id: "company",
//             styles:
//               "before:content-['\\2758'] before:mr-2 after:content-['\\2758'] after:ml-2",
//             tag: "span",
//           },
//           { id: "cityState", styles: "", tag: "span" },
//           { id: "country", styles: "", tag: "span" },
//           // { id: "isContinue", styles: "", tag: "span" },
//         ],
//       },
//       {
//         id: "achievements",
//         styles:
//           "text-sm text-justify pb-1 before:content-['\\2022'] before:mr-2",
//         tag: "span",
//       },
//     ],
//   },
//   education: {
//     tag: "div",
//     styles: "",
//     elements: [
//       {
//         tag: "div",
//         styles: "bg-gray-200 flex flex-col w-[30%] p-4 rounded-md",
//         container: [
//           {
//             id: "educationLevel",
//             styles: "font-semibold text-base",
//             tag: "span",
//           },
//           { id: "fieldOfStudy", styles: "text-xs font-semibold", tag: "span" },
//           {
//             id: "schoolName",
//             styles: "italic text-xs font-normal",
//             tag: "span",
//           },
//           {
//             id: "schoolLocation",
//             styles: "text-xs italic font-normal",
//             tag: "span",
//           },
//           {
//             styles: "flex flex-row gap-2 italic",
//             tag: "div",
//             container: [
//               { id: "fromMonth", styles: "text-xs", tag: "span" },
//               { id: "fromYear", styles: "text-xs", tag: "span" },
//               {
//                 id: "toMonth",
//                 styles: "text-xs before:content-['\\268A'] before:mr-2",
//                 tag: "span",
//               },
//               { id: "toYear", styles: "text-xs", tag: "span" },
//               // { id: "isContinue", styles: "", tag: "span" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// };

// const templateLayout = {
//   styles: "w-full",

//   fragment: {
//     styles: "flex flex-col bg-white fragment py-5",

//     header: {
//       styles:
//         "text-black m-2 p-3 flex flex-col w-[98%] justify-start rounded-md bg-gray-300 items-start my-6",
//       elements: [
//         {
//           id: "name",
//         },
//         {
//           id: "jobTitle",
//         },
//       ],
//     },

//     contact: {
//       styles:
//         "flex flex-row text-base w-[98%] justify-center items-center m-2 p-3 rounded-md gap-4 bg-gray-300",
//       elements: [
//         {
//           id: "phone",
//         },
//         {
//           id: "email",
//         },
//         {
//           id: "linkedin",
//         },
//       ],
//     },
//     summary: {
//       styles: "bg-red text-black text-justify px-8",
//       elements: [
//         {
//           id: "summary",
//         },
//       ],
//     },
//     skills: {
//       styles:
//         "bg-red text-black w-full flex-1 gap-2 flex flex-row flex-wrap justify-start items-start px-6 my-6",
//       elements: [
//         {
//           id: "primarySkills",
//         },
//       ],
//     },
//     workExperienceArray: {
//       styles: "flex flex-col px-8 w-full",

//       elements: [
//         {
//           id: "workExperienceArray",
//         },
//       ],
//     },
//     education: {
//       styles:
//         "bg-red text-black flex flex-col justify-start items-start px-6 my-6",
//       elements: [
//         {
//           id: "education",
//         },
//       ],
//     },
//   },
// };

const cleanUpHTML = (page) => {
  const cleanUpIds = [
    "shortName",
    "email",
    "linkedin",
    "phone",
    "primarySkills",
    "education",
    "name",
    "jobTitle",
    "summary",
  ];

  const containerNames = [
    "header",
    "skills",
    "summary",
    "contact",
    "workExperienceArray",
    "education",
    "sideBar",
  ];
  for (const cleanUpId of cleanUpIds) {
    let emptyIds = page.querySelectorAll(`#${cleanUpId}`);
    for (const emptyId of emptyIds) {
      emptyId.remove();
    }
  }
  for (const containerName of containerNames) {
    let emptyDivs = page.querySelectorAll(
      `[data-container-name="${containerName}"]`
    );
    for (const emptyDiv of emptyDivs) {
      if (emptyDiv.children.length === 0) {
        emptyDiv.remove();
      }
    }
  }
};

function handlingOverflow(page1, page2) {
  console.log(page1, page2);
  let pageOne = document.getElementById(page1);
  let pageTwo = document.getElementById(page2);
  console.log(pageOne, pageTwo);
}

function checkOverflow(id) {
  var element = document.getElementById(`page-${id}`);
  // Check if element exists
  if (!element) {
    return false;
  }

  var fragment = element.children[0];
  var children = fragment.children;

  var totalHeight = 0;

  // Calculate combined height of children
  for (var i = 0; i < children.length; i++) {
    let attr = children[i].getAttribute("data-container-name");
    if (attr === "sideBar") {
    } else {
      totalHeight += children[i].offsetHeight;
    }
  }

  // Check if total height exceeds viewport height
  if (totalHeight > element.clientHeight) {
    console.log("Overflow detected!");
    handlingOverflow(`page-${id}`, `page-${id + 1}`);
    // return true;
  } else {
    console.log("No overflow detected.");
    // return false;
  }
}

const setSidebarHeight = (page) => {
  const getSideBar = page.querySelector('div[data-container-name="sideBar"]');
  if (getSideBar) {
    getSideBar.style.height = "29.62cm";
  }
};
const newHeading = (name, content) => {
  console.log("inside")
  let elemHeading = document.createElement("h2");
  elemHeading.textContent = content;
  setStylesToElement(
    elemHeading,
    "font-bold text-base uppercase border-t-2 border-b-2 py-0.5 w-full"
  );
  const elem = document.querySelectorAll(`[data-name='${name}']`);
  elem[0]?.parentNode.insertBefore(elemHeading, elem[0]);
};
const addHeadings = () => {
  newHeading("summary", "executive summary");
  newHeading("phone", "contact");
  newHeading("workExperienceArray", "work experience");
  newHeading("primarySkills", "Skills");
  newHeading("education", "education");
};
const educationDivs = (page) => {
  const educationDivs = document.querySelectorAll(
    "[data-education-container-index]"
  );
  let newDiv = document.createElement("div");
  newDiv.setAttribute("data-container-name","education");
  for (const singleEducation of Array.from(educationDivs)) {
    newDiv.appendChild(singleEducation);
  }
  setStylesToElement(newDiv, "flex flex-row gap-4 px-6 flex-wrap");
  page.append(newDiv);
};

const isContentBleeding = (page, checking) => {
  let height = 0;
  let margins = 0;
  if (checking === "before") {
    height = 40;
  }
  let getBody = page.querySelector('div[data-container-name="body"]');
  if (getBody) {
    let style = window.getComputedStyle(getBody);
    margins = parseInt(style.marginTop) + parseInt(style.marginBottom);
  } else {
    getBody = page.children[0];
  }
  let isOverflowingVertically = getBody.clientHeight + height > 1119 - margins;
  if (isOverflowingVertically) {
    cleanUpHTML(page);
    isOverflowingVertically = getBody.clientHeight + height > 1119 - margins;
    if (!isOverflowingVertically) {
      return false;
    }
  }
  return isOverflowingVertically;
};

const wrapIn = (elems, name, index) => {
  const div = document.createElement("div");
  Array.from(elems).map((elem) => div.append(elem));
  setAttributesToElem([{ name: name }, { type: "inline-spans" }], div);
  return div;
};

const setAttributesToElem = (attr, elem) => {
  attr.map((atr) => {
    const [[key, value]] = Object.entries(atr);
    elem.setAttribute(`data-${key}`, value);
  });
};

const setStylesToElement = (elem, styles) => {
  if (styles) {
    styles.split(" ").map((cls) => elem.classList.add(cls));
  }
};
const newPage = () => {
  const div = document.createElement("div");
  div.classList.add("page");
  div.id = "page-" + pages.length;
  pages.push(div);
  cv.append(div);
  return div;
};

function getRandomHexCode() {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  // return color;
  return "#fff";
}

const createElements = (obj) => {
  const [key, value] = obj;
  if( key === "education"){
    debugger
  }
  //   append the attribute to the elements

  let template = components[key];

  let attr = [{ name: key }];
  //   if the value is a object
  if (typeof value === "object" && !Array.isArray(value)) {
    if (template.elements) {
      for (const element of template.elements) {
        if (value.hasOwnProperty(element.id) && value[element.id] !== "") {
          const _element = document.createElement(element.tag);
          const styles = element.styles;
          setStylesToElement(_element, styles);
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
                  const styles = element.styles;
                  setStylesToElement(_element, styles);
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
                const styles = element.styles;
                setStylesToElement(_element, styles);
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
                    const styles = item.styles;
                    setStylesToElement(singlespan, styles);
                    singlespan.textContent = singleItem[item.id];
                    container_element.append(singlespan);
                  }
                  if (item.container) {
                    const inner_container_element = document.createElement(
                      item.tag
                    );
                    setAttributesToElem(attr, inner_container_element);

                    setAttributesToElem(
                      [{ [`${key}-inner-container-index`]: i }],
                      inner_container_element
                    );
                    for (const one of item.container) {
                      if (
                        singleItem.hasOwnProperty(one.id) &&
                        singleItem[one.id] !== ""
                      ) {
                        const singlespan = document.createElement(one.tag);
                        setAttributesToElem(attr, singlespan);
                        const styles = one.styles;
                        setStylesToElement(singlespan, styles);
                        singlespan.textContent = singleItem[one.id];
                        inner_container_element.append(singlespan);
                      }
                    }
                    const styles = item.styles;
                    setStylesToElement(inner_container_element, styles);
                    container_element.append(inner_container_element);
                  }
                }
                const styles = element.styles;
                setStylesToElement(container_element, styles);
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
        const styles = template.styles;
        setStylesToElement(element, styles);
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
    const styles = template.styles;
    setStylesToElement(element, styles);
    spans.push(element);
  }
};

const generateElements = (element, tag) => {
  let elem = document.createElement(tag);
  elem.id = element.id;
  if (tag === "div") {
    elem.textContent = "ok";
  }
  return elem;
};

const generateLayout = (page) => {
  const currentPage = page.getAttribute("id").split("-").pop();
  for (let templatepart in templateLayout) {
    if (templatepart === "styles") {
    } else if (templatepart === "fragment") {
      for (let fragmentpart in templateLayout[templatepart]) {
        if (fragmentpart === "styles") {
        } else {
          const styles = templateLayout[templatepart][fragmentpart].styles;
          let div = document.createElement("div");
          setAttributesToElem([{ "container-name": fragmentpart }], div);
          styles.split(" ").map((cls) => div.classList.add(cls));
          const _elements = templateLayout[templatepart][
            fragmentpart
          ].elements.map((element) => {
            if (element.hasOwnProperty("fragment")) {
              return generateElements(element.fragment.elements[0], "div");
            } else {
              return generateElements(element, "span");
            }
          });

          _elements.map((_element) => div.append(_element));
          fragment.push({
            [fragmentpart]: div,
          });
        }
      }
      parts.push(fragment);
      fragment = [];
    } else {
      let div = document.createElement("div");
      const styles = templateLayout[templatepart].styles;
      styles.split(" ").map((cls) => div.classList.add(cls));

      const _elements = templateLayout[templatepart].elements.map((element) =>
        generateElements(element, "span")
      );

      _elements.map((_element) => div.append(_element));

      div.style.background = getRandomHexCode();

      parts.push({
        [templatepart]: div,
      });
    }
  }

  if (Array.isArray(parts[currentPage])) {
    let container = document.createElement("div");
    templateLayout.fragment.styles
      .split(" ")
      .map((cls) => container.classList.add(cls));
    parts[currentPage]
      .map((part) => {
        if (typeof part === "object" && !Array.isArray(part)) {
          const [[partName, partElem]] = Object.entries(part);
          container.append(partElem);
        }
      })
      .join("");
    page.append(container);
  }
};

const getToNode = (span, attribute, page) => {
  const currentPage = page.getAttribute("id").split("-").pop();
  for (const p of parts[currentPage]) {
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
    } else {
    }
  }
};

function FinalizeGeneration(span, page) {
  const attribute = span.getAttribute("data-name");

  const isItBefore = isContentBleeding(page, "before");
  if (attribute && !isItBefore) {
    getToNode(span, attribute, page);
  }
  if (isItBefore) {
    leftSpan.push({ span: span, attribute: attribute });
    return true;
  }

  const isItAfter = isContentBleeding(page, "after");
  return isItAfter;
}

fetch("./cv.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((jsonData) => {
    for (const item of Object.entries(jsonData)) {
      createElements(item);
    }
    return spans;
  })
  .then((spans) => {
    spans.forEach(
      (span) => {
        setTimeout(() => {
          const gen = FinalizeGeneration(span, pages[currentPageIndex]);
          
          if (gen) {
            const latestPage = newPage();
            
            generateLayout(latestPage);
            currentPageIndex = pages.length - 1;
            if (leftSpan.length > 0) {
              const leftOutSpan = FinalizeGeneration(
                leftSpan[0].span,
                pages[currentPageIndex]
                );
                leftSpan.pop();
              }
            }
          });
        },
        [1000]
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          pages.map((page, index) => {
            educationDivs(pages[index]);
            setSidebarHeight(pages[index]);
            checkOverflow(index);
            cleanUpHTML(page);
          });
          // addHeadings()
        }, [100]);
  });

const firstPage = newPage();
generateLayout(firstPage);
