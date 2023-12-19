export function formatPropVal(propVal) {
  const numericPropVal = parseFloat(propVal);
  let propValStr = "";

  if (numericPropVal >= 10000000) {
    propValStr = (numericPropVal / 10000000).toFixed(2) + " crore";
  } else if (numericPropVal >= 100000) {
    propValStr = (numericPropVal / 100000).toFixed(2) + " lakh";
  } else if (numericPropVal >= 1000) {
    propValStr = (numericPropVal / 1000).toFixed(2) + " thousand";
  } else {
    propValStr = numericPropVal.toFixed(2);
  }

  return propValStr;
}
