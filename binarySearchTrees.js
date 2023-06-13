class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array){
        this.array = this.sortArray(array);
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    }

    sortArray(array){       
        array = mergeSort(array);
        for(let i = 0; i < array.length; i++){
            if(array[i] === array[i + 1]){
                array.splice(i, 1);
            }
        }
        //array sorted and duplicates removed
        return array;
    }

    buildTree(array, start, end){
        //break case
        if(start > end){
            return null;
        }

        let mid = parseInt((start + end) / 2);

        const root = new Node(array[mid]);
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(value, root = this.root){
        if(root === null){
            root = new Node(value);
        }

        if(value > root.data){
            root.right = this.insert(value, root.right);
        } else if(value < root.data){
            root.left = this.insert(value, root.left);
        }

        return root;
    }

    delete(value, root = this.root){
        if(root === null){
            return root;
        }else if(value < root.data){
            root.left = this.delete(value, root.left);
        } else if (value > root.data){
            root.right = this.delete(value, root.right);
        } else {
            if(root.left === null && root.right === null){
                root = null;
            } else if(root.left === null){
                root = root.right;
            } else if(root.right === null){
                root = root.left;
            } else {
                root.data = minValue(root.right);
                root.right = this.delete(root.data, root.right);
            }
        }
        return root;
    }

    find(value, root = this.root){
        if(root === null){
            return root;
        }
        if(value < root.data){
            root = this.find(value, root.left)
        } else if(value > root.data){
            root = this.find(value, root.right);
        }
        return root;
    }

    levelOrder(yourFunction){
        let queue = [];
        let output = [];
        let root = this.root;
        if(root === null){
            return;
        }
        queue.push(root);
        while(queue.length !== 0){
            if(queue[0].left !== null){
                queue.push(queue[0].left);
            }
            if(queue[0].right !== null){
                queue.push(queue[0].right);
            }
            if(yourFunction){
                output.push(yourFunction(queue[0].data));
            } else {
                output.push(queue[0].data);
            }
            queue.shift();
        }
        return output;
    }

    height(root = this.root){
        if(root === null){
            return -1;
        }
        let left = this.height(root.left);
        let right = this.height(root.right);
        if(left > right){
            return(1 + left);
        } else {
            return(1 + right);
        }
    }

    depth(root){
        if(root === null){
            return root;
        }
        return this.height(this.root) - this.height(root);
    }

    isBalanced(root = this.root){
        if(root === null){
            return true;
        }
        let left = this.height(root.left);
        let right = this.height(root.right);
        if(left > right + 1 || this.isBalanced(root.left) === false){
            return false;
        } else if(right > left + 1 || this.isBalanced(root.right) === false){
            return false;
        } else {
            return true;
        }
    }

    rebalance(){
        let array = this.inorder();
        this.root = this.buildTree(array, 0, array.length - 1);
    }

    //next three functions return an array of the results
    //of yourFunction calls, if that isn't needed, just remove
    //output array and call the function without it
    //this is likely the most common way to use depth-first
    //however returning output easily demonstrates it works

    inorder(yourFunction, root = this.root, output = []){
        if(root === null){
            return root;
        }
        this.inorder(yourFunction, root.left, output);
        if(yourFunction){
            output.push(yourFunction(root.data));
        } else {
            output.push(root.data);
        }
        this.inorder(yourFunction, root.right, output);

        return output;
    }

    preorder(yourFunction, root = this.root, output = []){
        if(root === null){
            return root;
        }
        if(yourFunction){
            output.push(yourFunction(root.data));
        } else {
            output.push(root.data)
        }

        this.preorder(yourFunction, root.left, output);
        this.preorder(yourFunction, root.right, output);

        return output;
    }

    postorder(yourFunction, root = this.root, output = []){
        if(root === null){
            return root;
        }
        this.postorder(yourFunction, root.left, output);
        this.postorder(yourFunction, root.right, output);

        if(yourFunction){
            output.push(yourFunction(root.data));
        } else {
            output.push(root.data);
        }

        return output;
    }
}

//Driver below
let array = [0, 1, 2, 3, 4, 7, 6, 5, 9, 10, 18, 17, 11, 13, 12, 27, 16, 15, 19, 99];
const driver = new Tree(array);
console.log(driver.isBalanced());
console.log(driver.preorder());
console.log(driver.inorder());
console.log(driver.postorder());
console.log(driver.levelOrder());
prettyPrint(driver.root);
driver.insert(102);
driver.insert(130);
driver.insert(145);
driver.insert(200);
driver.insert(3000);
console.log(driver.isBalanced());
driver.rebalance();
prettyPrint(driver.root);
console.log(driver.isBalanced());
console.log(driver.preorder());
console.log(driver.inorder());
console.log(driver.postorder());
console.log(driver.levelOrder());


//helper function
function minValue(root){
    let min = root.data;
        while(root.left !== null){
            min = root.left.data;
            root = root.left;
        }
        return min;
}


///Sorting functions below, since i didnt use webpack
//
//
//
//
///
//
//
//
////
//
//
//
//

function mergeSort(array) {
    if (array.length > 1) {
        let array1 = mergeSort(array.slice(0, Math.ceil(array.length / 2)));
        let array2 = mergeSort(array.slice(Math.ceil(array.length / 2), array.length));
        return merge(array1, array2);
    }
    return array;
}

function merge(array1, array2){
    let i = 0;
    let j = 0;
    let newArray = [];
    while(i < array1.length && j < array2.length){
        if(array1[i] < array2[j]){
            newArray.push(array1[i]);
            i++;
        } else {
            newArray.push(array2[j]);
            j++;
        }
    }
    for(i; i < array1.length; i++){
        newArray.push(array1[i]);
    }
    for(j; j < array2.length; j++){
        newArray.push(array2[j]);
    }
    return newArray;
}


//
//
//
//

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};