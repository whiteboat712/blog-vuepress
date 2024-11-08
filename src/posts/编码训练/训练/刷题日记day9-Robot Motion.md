---
title: 刷题日记day9-Robot Motion
link: 刷题日记day9-Robot Motion
catalog: true

date: 2022-09-23 22:44:00 
subtitle: 刷题第九天
tags:
- c++
- 算法
category:
- [题目记录, 题单]
---
# 刷题日记day9-Robot Motion

今天斥巨资47元买了个好一点的枕头，pdd有的时候真的挺便宜的，不知道为啥，最近感觉自己觉醒了勤俭持家的本能，买什么都悠着点。

这道题也很简单，大概是纯模拟。

```component VPCard
title: POJ-1573 Robot Motion
desc: https://vjudge.net/problem/POJ-1573
link: https://vjudge.net/problem/POJ-1573
```

## 题面

![img](https://vj.csgrandeur.cn/b5f7b6f7437179e2a7369804425b8270?v=1663775168)
A robot has been programmed to follow the instructions in its path. Instructions for the next direction the robot is to move are laid down in a grid. The possible instructions are

N north (up the page)
S south (down the page)
E east (to the right on the page)
W west (to the left on the page)

For example, suppose the robot starts on the north (top) side of Grid 1 and starts south (down). The path the robot follows is shown. The robot goes through 10 instructions in the grid before leaving the grid.

Compare what happens in Grid 2: the robot goes through 3 instructions only once, and then starts a loop through 8 instructions, and never exits.

You are to write a program that determines how long it takes a robot to get out of the grid or how the robot loops around.

### input

> There will be one or more grids for robots to navigate. The data for each is in the following form. On the first line are three integers separated by blanks: the number of rows in the grid, the number of columns in the grid, and the number of the column in which the robot enters from the north. The possible entry columns are numbered starting with one at the left. Then come the rows of the direction instructions. Each grid will have at least one and at most 10 rows and columns of instructions. The lines of instructions contain only the characters N, S, E, or W with no blanks. The end of input is indicated by a row containing 0 0 0.

### output

> For each grid in the input there is one line of output. Either the robot follows a certain number of instructions and exits the grid on any one the four sides or else the robot follows the instructions on a certain number of locations once, and then the instructions on some number of locations repeatedly. The sample input below corresponds to the two grids above and illustrates the two forms of output. The word "step" is always immediately followed by "(s)" whether or not the number before it is 1.

### Sample

```
// input
3 6 5
NEESWE
WWWESS
SNWWWW
4 5 1
SESWE
EESNW
NWEEN
EWSEN
0 0 0
// output
10 step(s) to exit
3 step(s) before a loop of 8 step(s)
```

### 代码

```cpp
#include <iostream>
#include <string.h>
#include <map>
using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 1e3 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
int n, m, inx;
char mp[N][N];
int cnt[N][N];
int dx[128], dy[128];
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    dx['N'] = -1, dx['S'] = 1, dx['W'] = 0, dx['E'] = 0;
    dy['N'] = 0, dy['S'] = 0, dy['W'] = -1, dy['E'] = 1;
    while (cin >> n >> m >> inx) {
        memset(cnt, 0, sizeof cnt);
        if (n == 0 && m == 0 && inx == 0) break;
        for (int i = 1; i <= n; i++) cin >> mp[i] + 1;
        int x = 1, y = inx, count = 0;
        for (int i = 1; i <= n * m + 1; i++) {
            if (x >= 1 && x <= n && y >= 1 && y <= m) {
                if (cnt[x][y] == 0) {
                    count++;
                    cnt[x][y] = count;
                    char dir = mp[x][y];
                    x += dx[dir], y += dy[dir];
                } else {
                    cout << cnt[x][y] - 1 << " step(s) before a loop of " << count - cnt[x][y] + 1 << " step(s)\n";
                    break;
                }
            } else {
                cout << count << " step(s) to exit\n";
                break;
            }
        }
    }
    return 0;
}
```

## 思路

这个题的意思是：多组测试数据，给出地图的长宽和机器人在第一行的第几个元素进入地图，然后地图上每个格子上有一个字母代表方向（上北下南左西右东），机器人只按照脚下的方向移动。问你机器人会怎么动。

做法，开一个和地图一样大的数组，存储机器人到那个位置是第几步（默认为0），然后dfs每走一步就标记一下，直到出地图或者走到有标记的格子（形成循环），输出答案。