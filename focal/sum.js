
  
const args = process.argv.slice(2);

const Num1 = args[0]
const Num2 = args[1]

let sum = function(Num1,Num2){
	return Num1+" "+Num2;
}
console.log(sum(Num1, Num2))
console.log(typeof(Num1))
