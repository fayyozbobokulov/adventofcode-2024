const readFile = require('./readFile');

function isSafe(line) {
    // 7 6 4 2 1
    // a b
    let order;
    for(let i=0; i<line.length-1; i++) {
        const start = i;
        const end = i+1;

        if(!order) {
            const sign = line[start] - line[end];
            if(sign < 0) {
                order = 'increasing';
            } else if(sign > 0) {
                order = 'decreasing';
            } else {
                return false
            }
        }

        
        const result = line[start] - line[end];
        switch(order) {
            case 'decreasing': 
                if(result >= 1 && result <= 3) {
                    continue;
                } 
                return false;
            case 'increasing':
                if(result >= -3 && result <= -1) {
                    continue;
                }
                return false;
            default: 
                return false;
        }
    }

    return true;
}


function main() {
    const input = readFile('input02.txt');
    let safeCount = 0;
    let unsafeCount = 0;
    for(const item of input) {
        if(item.length === 0) {
            continue;
        }
        
        let safe = isSafe(item);
        if(safe === true) {
            safeCount++;
            continue;
        }

        let canBeMadeSafe = false;
        for(let i = 0; i < item.length; i++) {
            const modifiedItem = [...item];
            modifiedItem.splice(i, 1);
            
            if(isSafe(modifiedItem) === true) {
                canBeMadeSafe = true;
                break;
            }
        }

        if(canBeMadeSafe) {
            safeCount++;
        } else {
            unsafeCount++;
        }
    }
    console.log(`SAFE COUNT: ${safeCount}`);
    console.log(`UNSAFE COUNT: ${unsafeCount}`);
}
main()