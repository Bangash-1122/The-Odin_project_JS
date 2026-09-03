Q2: Skip Multiples of 3:
// Write a loop from 1 to 20 that:
// . skips numbers divisible by 3
// . prints all other numbers:

// use continue:


for (let i = 1; i <= 20; i++) {
     if (i % 3 === 0) {
         continue;
     }
     console.log(i);


 Q1. Stop at Frist Multiple of 7 :
// write a loop from 1 to 100 that:
// . prints each numbr 
// . stops completely when it finds the first number divisible by 7 

 for (let i = 1; i <= 100; i++) {
     console.log(i); // It prints every number from 1 to 100
     if (i % 7 === 0) {
         break;
         // console.log(i)// Print for this would not print 7 
     }

 }
