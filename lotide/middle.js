const middle = function(arr){
  let middle = []
  if(arr.length > 2){
  if(arr.length % 2 === 0){
    middle.push(arr[((arr.length / 2) - 1)], arr[(arr.length / 2)])
    }else{
      middle.push(arr[((arr.length - 1) / 2)])
    }
  }
  return middle
}


module.exports = middle
