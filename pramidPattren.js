let n = 4;

for (let i = 0; i < n; i++) {

    // Print spaces
    for (let j = 0; j < n - i - 1; j++) {
        process.stdout.write(" ");
    }

    // Print increasing numbers
    for (let k = 1; k <= i + 1; k++) {
        process.stdout.write(k.toString());
    }

    // Print decreasing numbers
    for (let l = i; l > 0; l--) {
        process.stdout.write(l.toString());
    }

    console.log();
}
//this is the answers
   1
  121
 12321
1234321
