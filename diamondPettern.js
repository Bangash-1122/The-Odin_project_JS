let n = 4;

// Top portion
for (let i = 0; i < n; i++) {

    // Left dashes
    for (let j = n; j > i + 1; j--) {
        process.stdout.write("-");
    }

    process.stdout.write("*");

    // Inner dashes + second star
    if (i !== 0) {
        for (let k = 0; k < 2 * i - 1; k++) {
            process.stdout.write("-");
        }

        process.stdout.write("*");
    }

    console.log();
}

// Bottom portion
for (let i = 0; i <= n - 1; i++) {

    // Left dashes
    for (let j = 0; j < i + 1; j++) {
        process.stdout.write("-");
    }

    process.stdout.write("*");

    // Inner dashes + second star
    if (i !== n - 2) {

        for (let k = 0; k < 2 * (n - i) - 5; k++) {
            process.stdout.write("-");
        }

        process.stdout.write("*");
    }

    console.log();
}

---*
--*-*
-*---*
*-----*
-*---*
--*-*
---*
----**
