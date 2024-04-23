const drawer = [
    { name: 'penny', value: 1, quantity: 2 },
    { name: 'nickel', value: 5, quantity: 0 },
    { name: 'dime', value: 10, quantity: 0 },
    { name: 'quarter', value: 25, quantity: 3 },
    { name: 'one', value: 100, quantity: 2 },
    { name: 'five', value: 500, quantity: 1 },
    { name: 'ten', value: 1000, quantity: 1 }
];

  //Find and remove item from drawer
function removeItem(name, drawer){
    for(let i = 0; i < drawer.length ; i++){
        if(drawer[i].name === name && drawer[i].quantity > 0){
            drawer[i].quantity--;
        }
    }
    return true;
}

//Adds a single item to the drawer

function addItem(name, drawer){
    for(let i = 0; i < drawer.length; i++){
        if(drawer[i].name === name){
            drawer[i].quantity++;
        }
    }
    return false;
}

//Counts how many coins are in the drawer
function countCoins(drawer){
    let coinQuantity = 0;
    for(let i = 0; i < drawer.length; i++){
        if(drawer[i].value <= 25){
           coinQuantity += drawer[i].quantity;
        }
    }
    return coinQuantity;
}
//Counts how many notes/bills are in the drawer
function countNotes(drawer){
    let noteQuantity = 0;
    for(let i = 0; i < drawer.length; i++){
        if(drawer[i].value >= 100){
            noteQuantity += drawer[i].quantity;
        }
    }
    return noteQuantity;
}

//Calculates total of money in drawer as string format in dollars
function sumDrawer(drawer){
    let total = 0;
    for(let i = 0; i < drawer.length; i++){
        total += (drawer[i].quantity * drawer[i].value);
    }
    //should return 13,641
    return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

//is it possible to create a specific cash amount from the items in the drawer if so return true
function makeChange(amount, drawer) {
    let change = [];
    for (let i = drawer.length - 1; i >= 0; i--) {
        
        const currentItem = drawer[i];

        while (amount >= currentItem.value && currentItem.quantity > 0) {

            change.push({ name: currentItem.name, value: currentItem.value });
            amount -= currentItem.value;
            currentItem.quantity--;

        }
    }
    return amount === 0;
}

const targetAmount = 613;
const changePossible = makeChange(targetAmount, drawer);
console.log(changePossible)


//Calculates the change required from a transaction and removes it from the drawer if possible.
function transaction(cost, paid, drawer){
    const changeAmount = paid - cost;
    if(makeChange(changeAmount, drawer)){
        // if make change returns true add paid amount
        addItem('penny', drawer);

        drawer[0].quantity += Math.floor(paid);

        // take out change
        for(let i = drawer.length - 1; i >= 0; i--){
            const currentItem = drawer[i];
            while(changeAmount >= currentItem.value && currentItem.quantity > 0){
                removeItem(currentItem.name, drawer);
                changeAmount -= currentItem.value;
            }
        }

        return drawer;
    }else {
        return false;
    }
}
const updatedDrawer = transaction(500, 1000, drawer);
console.log(updatedDrawer);