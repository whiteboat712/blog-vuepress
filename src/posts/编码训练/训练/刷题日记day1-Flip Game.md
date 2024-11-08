---
title: 刷题日记day1-Flip Game
link: 刷题日记day1-Flip Game
catalog: true
date: 2022-09-15 23:30:01 
subtitle: 刷题第一天
tags:
- c++
- 算法
category:
- 题目记录
- 题单
isOriginal: true
---
# 刷题日记day1-Flip Game

做某个题单的第一道题，虽然没什么难度，但是还是十分考验码代码的能力的（很容易写出bug），不过还好，这次写的还是很顺利的。

```component VPCard
title: POJ-1753 Flip Game
desc: 翻转游戏
link: https://vjudge.net/problem/POJ-1753
```

## 题面

Flip game is played on a rectangular 4x4 field with two-sided pieces placed on each of its 16 squares. One side of each piece is white and the other one is black and each piece is lying either it's black or white side up. Each round you flip 3 to 5 pieces, thus changing the color of their upper side from black to white and vice versa. The pieces to be flipped are chosen every round according to the following rules:

1. Choose any one of the 16 pieces.
2. Flip the chosen piece and also all adjacent pieces to the left, to the right, to the top, and to the bottom of the chosen piece (if there are any).

Consider the following position as an example:

```
bwbw
wwww
bbwb
bwwb
```

Here "b" denotes pieces lying their black side up and "w" denotes pieces lying their white side up. If we choose to flip the 1st piece from the 3rd row (this choice is shown at the picture), then the field will become:

```
bwbw
bwww
wwwb
wwwb
```

The goal of the game is to flip either all pieces white side up or all pieces black side up. You are to write a program that will search for the minimum number of rounds needed to achieve this goal.

![img](https://vj.csgrandeur.cn/14b4b3ec0b5261bea3a5ad9f1313252c?v=1663071533)

### input

> The input consists of 4 lines with 4 characters "w" or "b" each that denote game field position.

### output

> Write to the output file a single integer number - the minimum number of rounds needed to achieve the goal of the game from the given position. If the goal is initially achieved, then write 0. If it's impossible to achieve the goal, then write the word "Impossible" (without quotes).

### Sample

```
// input
bwwb
bbwb
bwwb
bwww
// output
4
```

### 代码

```cpp
#include <iostream>
#include <cstdio>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 3 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
char mp[N][N], mid[N][N];
int dx[5] = {0, 1, 0, -1, 0};
int dy[5] = {1, 0, -1, 0, 0};
// 检查位置合法性
bool check(int x, int y) {
    if (x >= 1 && y >= 1 && x <= 4 && y <= 4) return true;
    else return false;
}
// 翻转一个棋子
void change(int x, int y) {
    for (int i = 0; i < 5; i++) {
        if (check(x + dx[i], y + dy[i])) {
            if (mid[x + dx[i]][y + dy[i]] == 'w') {
                mid[x + dx[i]][y + dy[i]] = 'b';
            } else {
                mid[x + dx[i]][y + dy[i]] = 'w';
            }
        }
    }
}
// 将整个图向右转一下
void turn() {
    for (int i = 1; i <= 4; i++)
        for (int j = 1; j <= 4; j++)
            mid[i][j] = mp[5 - j][i];
    for (int i = 1; i <= 4; i++)
        for (int j = 1; j <= 4; j++)
            mp[i][j] = mid[i][j];
}

int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
  	// 读入
    for (int i = 1; i <= 4; i++)
        cin >> mp[i] + 1;
    int ans = 0x3f3f3f3f;
    for (int l = 1; l <= 4; l++) {
        turn(); // 右转
        for (int i = 0; i < 1 << 4; i++) {
          	// 变成全黑的情况
            for (int j = 1; j <= 4; j++)
                for (int k = 1; k <= 4; k++)
                    mid[j][k] = mp[j][k];
            int al = i;
            int cnt = 0;
            bool flag = true;
            for (int j = 1; j <= 4; j++) {
                if (al & 1) {
                    change(1, j);
                    cnt++;
                }
                al >>= 1;
            }
            for (int j = 2; j <= 4; j++) {
                for (int k = 1; k <= 4; k++) {
                    if (mid[j - 1][k] == 'w') {
                        change(j, k);
                        cnt++;
                    }
                }
            }
            for (int j = 1; j <= 4; j++) {
                if (mid[4][j] != 'b') {
                    flag = false;
                }
            }
            if (flag) {
                ans = min(ans, cnt);
            }
          	// 变成全白的情况
            for (int j = 1; j <= 4; j++)
                for (int k = 1; k <= 4; k++)
                    mid[j][k] = mp[j][k];
            al = i;
            cnt = 0;
            flag = true;
            for (int j = 1; j <= 4; j++) {
                if (al & 1) {
                    change(1, j);
                    cnt++;
                }
                al >>= 1;
            }
            for (int j = 2; j <= 4; j++) {
                for (int k = 1; k <= 4; k++) {
                    if (mid[j - 1][k] == 'b') {
                        change(j, k);
                        cnt++;
                    }
                }
            }
            for (int j = 1; j <= 4; j++) {
                if (mid[4][j] != 'w') {
                    flag = false;
                }
            }
            if (flag) {
                ans = min(ans, cnt);
            }
        }
    }
    if (ans == 0x3f3f3f3f) cout << "Impossible";
    else cout << ans;
    return 0;
}
```

## 思路

就是十分简单的递推，每次随机翻转第一排，因为翻转只会影响前面一排，所以然后后面的需要翻转的棋子就会确定下来，这样依次翻转后，只有最后一排不能确定颜色，再检测最后一排是不是同色。如果是同色，说明这种翻转方案是合法的，记录下翻转次数，然后和ans比一下大小，最后输出ans。

其中为了确定所有的可能性，我对于每种分别检测了变成全白和全黑的结果（毕竟很可能所需步数不一样），而且我还让棋盘旋转了4次，每次90度。（有点麻烦）