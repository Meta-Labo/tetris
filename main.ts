namespace SpriteKind {
    export const blobk = SpriteKind.create()
    export const wall = SpriteKind.create()
    export const next = SpriteKind.create()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    checkTetrimino(0, moveX + 1, moveY)
    if (error == 0) {
        moveX += 1
        drawTetrimino(0, moveX, moveY)
    }
})
function deleteLine () {
    deleteLineNo = 0
    for (let l = 0; l <= 14; l++) {
        p = 0
        for (let m = 0; m <= 9; m++) {
            if (tetris[l][m] == 0) {
                break;
            }
            p += 1
        }
        if (p == 10) {
            deleteLineNo = l
            break;
        }
    }
    if (deleteLineNo > 0) {
        for (let n = 0; n <= deleteLineNo - 1; n++) {
            for (let o = 0; o <= 9; o++) {
                tetris[deleteLineNo - n][o] = tetris[deleteLineNo - n - 1][o]
            }
        }
        for (let q = 0; q <= 9; q++) {
            tetris[0][q] = 0
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    checkTetrimino(0, moveX, moveY + 1)
    if (error == 0) {
        moveY += 1
        drawTetrimino(0, moveX, moveY)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.blobk, function (sprite, otherSprite) {
    l = otherSprite.x
    m = otherSprite.y
    sprites.destroy(otherSprite, effects.spray, 200)
    block = sprites.create(blocks[0], SpriteKind.blobk)
    block.setPosition(l, m)
})
function initialize () {
    for (let y3 = 0; y3 <= 14; y3++) {
        tetris.push([])
        for (let x3 = 0; x3 <= 9; x3++) {
            tetris[y3].push(0)
        }
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    checkTetrimino(0, moveX - 1, moveY)
    if (error == 0) {
        moveX += -1
        drawTetrimino(0, moveX, moveY)
    }
})
function drawTetrimino (no: number, sx: number, sy: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    for (let y = 0; y <= 3; y++) {
        for (let x = 0; x <= 3; x++) {
            btp = tetrimino[no][y][x]
            if (btp != 0 && sy + y >= 0) {
                block = sprites.create(blocks[btp], SpriteKind.Player)
                block.setPosition((sx + x) * 8 + 20, (sy + y) * 8 + 4)
            }
        }
    }
}
function drawTetriminoNext (sx: number, sy: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.next)
    for (let y = 0; y <= 3; y++) {
        for (let x = 0; x <= 3; x++) {
            btp = tetrimino[tetriminoNext][y][x]
            if (btp != 0) {
                block = sprites.create(blocks[btp], SpriteKind.next)
                block.setPosition((sx + x) * 8 + 20, (sy + y) * 8 + 4)
            }
        }
    }
}
function drawTetris () {
    sprites.destroyAllSpritesOfKind(SpriteKind.blobk)
    for (let y2 = 0; y2 <= tetris.length - 1; y2++) {
        for (let x2 = 0; x2 <= tetris[y2].length - 1; x2++) {
            block = sprites.create(blocks[tetris[y2][x2]], SpriteKind.blobk)
            block.setPosition(x2 * 8 + 20, y2 * 8 + 4)
        }
    }
}
function start () {
    moveX = 3
    moveY = -2
    tetrimino[0] = tetrimino[tetriminoNext]
    drawTetrimino(0, moveX, moveY)
    tetriminoNext = randint(1, 7)
    drawTetriminoNext(12, 4)
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    sprites.destroy(mySprite2)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    if (stop == 1) {
        drawTetris()
        start()
    }
    stop = 0
})
function setTetrimino (no: number, sx: number, sy: number) {
    for (let y22 = 0; y22 <= 3; y22++) {
        for (let x22 = 0; x22 <= 3; x22++) {
            btp = tetrimino[no][y22][x22]
            if (btp != 0) {
                if (sy + y22 >= 0) {
                    tetris[sy + y22][sx + x22] = btp
                }
            }
        }
    }
}
function rotate () {
    x = moveX
    y = moveY
    for (let k = 0; k <= 3; k++) {
        for (let r = 0; r <= 3; r++) {
            tetriminoT[k][r] = tetrimino[0][k][r]
        }
    }
    for (let s = 0; s <= 3; s++) {
        for (let t = 0; t <= 3; t++) {
            tetrimino[0][s][t] = tetriminoT[3 - t][s]
        }
    }
    checkTetrimino(0, moveX, moveY)
    if (error != 0) {
        if (error < 0) {
            moveX += 0 - error
            checkTetrimino(0, moveX, moveY)
        } else if (error > 0 && error < 8) {
            moveX += 0 - error
            checkTetrimino(0, moveX, moveY)
        }
        if (error != 0) {
            for (let u = 0; u <= 3; u++) {
                for (let v = 0; v <= 3; v++) {
                    tetrimino[0][u][v] = tetriminoT[u][v]
                }
            }
            moveX = x
            moveY = y
        }
    }
    drawTetrimino(0, moveX, moveY)
}
function checkTetrimino (no: number, sx: number, sy: number) {
    error = 0
    for (let y23 = 0; y23 <= 3; y23++) {
        for (let x23 = 0; x23 <= 3; x23++) {
            btp = tetrimino[no][y23][x23]
            if (btp != 0) {
                if (sx + x23 < 0) {
                    if (sx + x23 < error) {
                        error = sx + x23
                    }
                } else if (sx + x23 >= 10) {
                    if (sx + x23 - 9 > error) {
                        error = sx + x23 - 9
                    }
                } else {
                    if (sy + y23 >= 15) {
                        error = 9
                        return
                    }
                    if (sy + y23 >= 0 && tetris[sy + y23][sx + x23] != 0) {
                        error = 8
                        return
                    }
                }
            }
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate()
})
let projectile: Sprite = null
let y = 0
let x = 0
let mySprite2: Sprite = null
let btp = 0
let block: Sprite = null
let m = 0
let l = 0
let tetris: number[][] = []
let p = 0
let deleteLineNo = 0
let mySprite: Sprite = null
let error = 0
let moveY = 0
let moveX = 0
let stop = 0
let blocks: Image[] = []
let tetriminoT: number[][] = []
let temp12: number[][] = []
let tetrimino: number[][][] = []
let tetriminoNext = 0
tetriminoNext = randint(1, 7)
let tetriminoData = [
[
"0000",
"0000",
"0000",
"0000"
],
[
"0000",
"0110",
"0110",
"0000"
],
[
"0000",
"0200",
"2220",
"0000"
],
[
"0000",
"3300",
"0330",
"0000"
],
[
"0000",
"0044",
"0440",
"0000"
],
[
"0000",
"5555",
"0000",
"0000"
],
[
"0000",
"6660",
"0060",
"0000"
],
[
"0000",
"0070",
"7770",
"0000"
]
]
for (let w = 0; w <= 7; w++) {
    let temp1: number[][] = []
    for (let a = 0; a <= 3; a++) {
        let temp2: number[] = []
        for (let b = 0; b <= 3; b++) {
            temp2.push(parseFloat(tetriminoData[w][a].charAt(b)))
        }
        temp1.push(temp2)
    }
    tetrimino.push(temp1)
}
for (let c = 0; c <= 3; c++) {
    let temp22: number[] = []
    for (let d = 0; d <= 3; d++) {
        temp22.push(d)
    }
    temp12.push(temp22)
}
tetriminoT = temp12
blocks = [
img`
    . . . . . . . d 
    . . . . . . . d 
    . . . . . . . d 
    . . . . . . . d 
    . . . . . . . d 
    . . . . . . . d 
    . . . . . . . d 
    d d d d d d d d 
    `,
img`
    7 7 7 7 7 7 7 d 
    7 7 7 7 7 7 7 d 
    7 7 7 7 7 7 7 d 
    7 7 7 7 7 7 7 d 
    7 7 7 7 7 7 7 d 
    7 7 7 7 7 7 7 d 
    7 7 7 7 7 7 7 d 
    d d d d d d d d 
    `,
img`
    6 6 6 6 6 6 6 d 
    6 6 6 6 6 6 6 d 
    6 6 6 6 6 6 6 d 
    6 6 6 6 6 6 6 d 
    6 6 6 6 6 6 6 d 
    6 6 6 6 6 6 6 d 
    6 6 6 6 6 6 6 d 
    d d d d d d d d 
    `,
img`
    5 5 5 5 5 5 5 d 
    5 5 5 5 5 5 5 d 
    5 5 5 5 5 5 5 d 
    5 5 5 5 5 5 5 d 
    5 5 5 5 5 5 5 d 
    5 5 5 5 5 5 5 d 
    5 5 5 5 5 5 5 d 
    d d d d d d d d 
    `,
img`
    4 4 4 4 4 4 4 d 
    4 4 4 4 4 4 4 d 
    4 4 4 4 4 4 4 d 
    4 4 4 4 4 4 4 d 
    4 4 4 4 4 4 4 d 
    4 4 4 4 4 4 4 d 
    4 4 4 4 4 4 4 d 
    d d d d d d d d 
    `,
img`
    3 3 3 3 3 3 3 d 
    3 3 3 3 3 3 3 d 
    3 3 3 3 3 3 3 d 
    3 3 3 3 3 3 3 d 
    3 3 3 3 3 3 3 d 
    3 3 3 3 3 3 3 d 
    3 3 3 3 3 3 3 d 
    d d d d d d d d 
    `,
img`
    2 2 2 2 2 2 2 d 
    2 2 2 2 2 2 2 d 
    2 2 2 2 2 2 2 d 
    2 2 2 2 2 2 2 d 
    2 2 2 2 2 2 2 d 
    2 2 2 2 2 2 2 d 
    2 2 2 2 2 2 2 d 
    d d d d d d d d 
    `,
img`
    9 9 9 9 9 9 9 d 
    9 9 9 9 9 9 9 d 
    9 9 9 9 9 9 9 d 
    9 9 9 9 9 9 9 d 
    9 9 9 9 9 9 9 d 
    9 9 9 9 9 9 9 d 
    9 9 9 9 9 9 9 d 
    d d d d d d d d 
    `
]
initialize()
stop = 0
moveX = 3
moveY = -1
error = 0
drawTetris()
start()
for (let l = 0; l <= 14; l++) {
    mySprite = sprites.create(img`
        . . . . . . . d 
        . . . . . . . d 
        . . . . . . . d 
        . . . . . . . d 
        . . . . . . . d 
        . . . . . . . d 
        . . . . . . . d 
        . . . . . . . d 
        `, SpriteKind.wall)
    mySprite.setPosition(12, l * 8 + 4)
}
game.onUpdateInterval(1000, function () {
    if (stop == 0) {
        moveY += 1
        checkTetrimino(0, moveX, moveY)
        if (error != 0) {
            if (moveY <= 0) {
                game.gameOver(false)
            } else {
                setTetrimino(0, moveX, moveY - 1)
                drawTetris()
                sprites.destroyAllSpritesOfKind(SpriteKind.Player)
                for (let index = 0; index < 15; index++) {
                    deleteLine()
                    if (deleteLineNo == 0) {
                        break;
                    } else {
                        stop = 1
                        mySprite2 = sprites.create(img`
                            . . . . . . 4 4 
                            . . . . 4 4 4 2 
                            . . 4 4 4 2 2 2 
                            4 4 4 2 2 2 5 5 
                            4 4 4 2 2 2 5 5 
                            . . 4 4 4 2 2 2 
                            . . . . 4 4 4 2 
                            . . . . . . 4 4 
                            `, SpriteKind.Projectile)
                        mySprite2.setPosition(10 * 8 + 20, deleteLineNo * 8 + 4)
                        projectile = sprites.createProjectileFromSprite(img`
                            . . . . . . . . 
                            . . . . . . 2 2 
                            . . . 1 1 1 2 . 
                            1 1 1 1 5 5 2 2 
                            1 1 1 1 5 5 2 2 
                            . . . 1 1 1 2 . 
                            . . . . . . 2 2 
                            . . . . . . . . 
                            `, mySprite2, -50, 0)
                    }
                }
                if (stop == 0) {
                    start()
                }
            }
        } else {
            drawTetrimino(0, moveX, moveY)
        }
    }
})
