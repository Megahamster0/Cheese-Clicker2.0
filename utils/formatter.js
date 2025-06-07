 //nf=Number formatter
function nf(num) {
  
  if (num < 1000) return Math.round(num)

  const match = [
    {value: 1e3, symbol:"K"}, // thousand
    {value: 1e6, symbol:"M"}, // million
    {value: 1e9, symbol:"B"},
    {value: 1e12, symbol:"T"},
  ]

  let item = match.findLast(function(obj){return num >= obj.value})
  if (!item) return Math.round(num);

  return (num / item.value).toFixed(2) + item.symbol

}