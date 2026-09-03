Q3: print First 5 odd numbers Only 
// Write a loop from 1 to 100 that :

// .prints only 5 odd numbers
// Then stops the loop:

// use both if, Continue, and a counter +break

// Expected output: 1 3 5 7 9;
 let count = 0;
 for (let i = 1; i <= 100; i++) {
     if (i % 2 === 1) {
         count++;
         console.log(i);
     }

    if (count === 5) break;
 }

