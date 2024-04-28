class Graph {
    constructor(vertices, startNode) {
        this.vertices = vertices;
        this.node = startNode;
        this.adjList = new Map();
        this.Gt = [[startNode]];
        this.minSkeletonWeight = 0;
    }

    addEdge(u, v, w) {
        if (!this.adjList.has(u)) {
            this.adjList.set(u, []);
        }
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        }
        this.adjList.get(u).push({node: v, weight: w});
        this.adjList.get(v).push({node: u, weight: w});
    }

    removeEdge(u, v) {
        let arrayU = this.adjList.get(u);
        arrayU = arrayU.filter(vertex => vertex.node !== v);
        this.adjList.set(u, arrayU);

        let arrayV = this.adjList.get(v);
        arrayV = arrayV.filter(vertex => vertex.node !== u);
        this.adjList.set(v, arrayV);
    }

    prim() {
        let minWeight = Infinity;
        let nextNode;
        let thisNode;
        for (let j = 0; j < this.Gt[0].length; j++) {
            let node = this.Gt[0][j];
            for (let [key, value] of this.adjList.entries()) {
                if (node === key) {
                    for (let i = 0; i < value.length; i++) {
                        if (value[i].weight < minWeight && !this.Gt[0].includes(value[i].node)) {
                            minWeight = value[i].weight;
                            nextNode = value[i].node;
                            thisNode = node;
                        }
                    }
                    break;
                }
            }
        }
        this.Gt[0].push(nextNode);
        this.Gt.push([thisNode, nextNode]);
        if (minWeight !== Infinity) this.minSkeletonWeight += minWeight;
        let i, j;
        if (thisNode < nextNode){
            i = thisNode;
            j = nextNode;
        }
        else {
            i = nextNode;
            j = thisNode;
        }
        console.log(this.minSkeletonWeight);
        drawConnection(i, j, nodePositions1, matrix1, 'red', matrixW, 0, 2);
        drawNode(i, nodePositions1, '#9B4AE7' );
        drawNode(j, nodePositions1, '#9B4AE7' );
    }

}

function selfConnection(i, x, y, color, weight) {
    let offsetX;
    ctx.strokeStyle = color;
    if ((x > canvas.width / 2)) offsetX = 32;
    else offsetX = -32;
    x += offsetX;
    ctx.beginPath();
    ctx.arc(x, y - 15, 20, Math.PI / 1.3, Math.PI * 6.5 / 2);
    ctx.fillText(`${weight}`, x + offsetX, y - 15);
    ctx.stroke();
    ctx.closePath();
}

function drawNode(i, array, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(array[i].x, array[i].y, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.font = '30px Times New Roman';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i + 1}`, array[i].x, array[i].y);
}

function drawConnection(i, j, nodePositions, matrix, color, weight, a = 1, lineWidth = 1) {
    if(a === 1 && i < j) {
        let weight = matrixW[i][j];
        if (weight === 0) weight = Infinity;
        graph.addEdge(i, j, weight);
    }
    if (matrix[i][j] === 1 && i <= 10 && i <= j) {
        ctx.lineWidth = lineWidth;
        const nodePosI = nodePositions[i];
        const nodePosJ = nodePositions[j];
        const midX = (nodePosI.x + nodePosJ.x) / 2;
        const midY = (nodePosI.y + nodePosJ.y) / 2;
        ctx.beginPath();
        ctx.moveTo(nodePosJ.x, nodePosJ.y);
        ctx.fillStyle = 'black';
        ctx.font = '20px Times New Roman';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyleStyle = color;
        if (Math.abs(i - j) === 5 && nodePosI !== nodePositions[10]) {
            drawBentConnection(i, j, midX, midY, nodePosI, nodePosJ, color, weight);
        } else if (i !== j) {
            ctx.fillText(`${weight[i][j]}`, midX, midY);
            drawRegularConnection(i, j, midX, midY, nodePosI, nodePosJ, color);
        } else {
            selfConnection(i, nodePosI.x, nodePosI.y, color, weight[i][j]);
        }
    }
}

function drawBentConnection(i, j, midX, midY, nodePosI, nodePosJ, color, weight) {
    ctx.strokeStyle = color;
    if (i === 0 || j === 0) {
        ctx.fillText(`${weight[i][j]}`, midX, nodePosI.y + 50);
        ctx.lineTo(midX, nodePosI.y + 50);
        ctx.moveTo(midX, nodePosI.y + 50);
        ctx.lineTo(nodePosI.x, nodePosI.y);
        ctx.stroke();
    } else if (midX !== nodePositions1[10].x) {
        ctx.fillText(`${weight[i][j]}`, midX - 60, nodePosJ.y);
        ctx.lineTo(midX - 60, nodePosJ.y);
        ctx.moveTo(midX - 60, nodePosJ.y);
        ctx.lineTo(nodePosI.x, nodePosI.y);
        ctx.stroke();
    } else {
        ctx.fillText(`${weight[i][j]}`, nodePosI.x - 10, midY - 20);
        ctx.lineTo(nodePosI.x - 10, midY);
        ctx.moveTo(nodePosI.x - 10, midY);
        ctx.lineTo(nodePosI.x, nodePosI.y);
        ctx.stroke();
    }
}

function drawRegularConnection(i, j, midX, midY, nodePosI, nodePosJ, color) {
    ctx.strokeStyle = color;
    ctx.lineTo(nodePosI.x, nodePosI.y);
    ctx.lineTo(nodePosI.x, nodePosI.y);
    ctx.stroke();
}

function PRNG(seed) {
    this.seed = seed;
    const m = Math.pow(2, 31);
    this.next = function () {
        this.seed = (1103515245 * this.seed + 12345) % m;
        return (this.seed / m) * 2;
    };
}

const prng = new PRNG(3317);
const n1 = 3;
const n2 = 3;
const n3 = 1;
const n4 = 7;
const n = 10 + n3;

let matrix2 = [];
const k = 1 - n3 * 0.01 - n4 * 0.005 - 0.05;
for (let i = 0; i < n; i++) {
    matrix2[i] = [];
    for (let j = 0; j < n; j++) {
        let num = prng.next();
        matrix2[i][j] = Math.floor(num * k);
    }
}
let matrix1 = [];
for (let i = 0; i < matrix2.length; i++) {
    matrix1[i] = [];
    for (let j = 0; j < matrix2[i].length; j++) {
        matrix1[i][j] = matrix2[i][j];
    }
}
for (let i = 0; i < matrix1.length; i++) {
    for (let j = i; j < matrix1[i].length; j++) {
        if (matrix1[i][j] !== matrix1[j][i]) {
            matrix1[i][j] = matrix1[j][i] = Math.max(matrix1[i][j], matrix1[j][i]);
        }
    }
}
console.log(`Undirected graph matrix: `);
console.log(matrix1);
let matrixB = [];
for (let i = 0; i < n; i++) {
    matrixB[i] = [];
    for (let j = 0; j < n; j++) {
        matrixB[i][j] = prng.next();
    }
}
//console.log(matrixB);
let matrixC = [];
for (let i = 0; i < n; i++) {
    matrixC[i] = [];
    for (let j = 0; j < n; j++) {
        matrixC[i][j] = Math.ceil(matrixB[i][j] * 100 * matrix1[i][j]);
    }
}
//console.log(matrixC);
let matrixD = [];
for (let i = 0; i < n; i++) {
    matrixD[i] = [];
    for (let j = 0; j < n; j++) {
        if (matrixC[i][j] === 0) matrixD[i][j] = 0;
        else if (matrixC[i][j] > 0) matrixD[i][j] = 1;
    }
}
//console.log(matrixD);
let matrixH = [];
for (let i = 0; i < n; i++) {
    matrixH[i] = [];
    for (let j = 0; j < n; j++) {
        if (matrixD[i][j] !== matrixD[j][i]) matrixH[i][j] = 1;
        else matrixH[i][j] = 0;
    }
}
//console.log(matrixH);
let matrixTr = [];
for (let i = 0; i < n; i++) {
    matrixTr[i] = [];
    for (let j = 0; j < n; j++) {
        if (i < j) matrixTr[i][j] = 1;
        else matrixTr[i][j] = 0;
    }
}
//console.log(matrixTr);
let matrixW = [];
for (let i = 0; i < n; i++) {
    matrixW[i] = [];
}
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i <= j) {
            matrixW[i][j] = (matrixD[i][j] + matrixH[i][j] * matrixTr[i][j]) * matrixC[i][j];
            matrixW[j][i] = (matrixD[i][j] + matrixH[i][j] * matrixTr[i][j]) * matrixC[i][j];
        }
    }
}
console.log(`Weight graph matrix: `);
console.log(matrixW);

const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
let radius = 300;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const angleIncrement = (2 * Math.PI) / (n - 1);
const nodePositions1 = [];
for (let i = 0; i < n - 1; i++) {
    const x = centerX - radius * Math.cos(i * angleIncrement);
    const y = centerY - radius * Math.sin(i * angleIncrement);
    nodePositions1.push({x: x, y: y});
}
nodePositions1.push({x: centerX, y: centerY});
let startNode = 0;
for (let i = 0; i < n; i++) {
    if (matrix1[i].some(value => value === 1)) {
        startNode = i;
        break;
    }
}
const graph = new Graph(n, startNode);
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        drawConnection(i, j, nodePositions1, matrix1, 'black', matrixW);
    }
}
for (let i = 0; i < n; i++) {
    drawNode(i, nodePositions1, '#9B4AE7');
}
console.log(graph.adjList);




