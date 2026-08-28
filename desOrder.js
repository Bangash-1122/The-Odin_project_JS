let n = 4;

for (let i = 0; i < n; i++) {

    for (let j = i + 1; j > 0; j--) {
        process.stdout.write(j + " ");
    }

    console.log();
}

// 
// 1
// 2 1
// 3 2 1
// 4 3 2 1
