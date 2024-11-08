---
title: 刷题日记day8-Crashing Robots
link: 刷题日记day8-Crashing Robots
catalog: true

date: 2022-09-22 22:52:00 
subtitle: 刷题第八天
tags:
- c++
- 算法
category:
- [题目记录, 题单]
---
# 刷题日记day8-Crashing Robots

今天第一次跑了六公里，累了个半死。给自己的手机买了个钢化膜，贴上后触控不灵敏了，好难受。不过这个膜才9块9，没有想象中的翘边，也挺好的，就是指纹解锁变慢了，上划返回桌面也不灵了，几次才能成功一次。

这道题很简单，纯模拟。

```component VPCard
title: POJ-2632 Crashing Robots
desc: https://vjudge.net/problem/POJ-2632
link: https://vjudge.net/problem/POJ-2632
```

## 题面

In a modernized warehouse, robots are used to fetch the goods. Careful planning is needed to ensure that the robots reach their destinations without crashing into each other. Of course, all warehouses are rectangular, and all robots occupy a circular floor space with a diameter of 1 meter. Assume there are N robots, numbered from 1 through N. You will get to know the position and orientation of each robot, and all the instructions, which are carefully (and mindlessly) followed by the robots. Instructions are processed in the order they come. No two robots move simultaneously; a robot always completes its move before the next one starts moving.
A robot crashes with a wall if it attempts to move outside the area of the warehouse, and two robots crash with each other if they ever try to occupy the same spot.

### input

> The first line of input is K, the number of test cases. Each test case starts with one line consisting of two integers, 1 <= A, B <= 100, giving the size of the warehouse in meters. A is the length in the EW-direction, and B in the NS-direction.
> The second line contains two integers, 1 <= N, M <= 100, denoting the numbers of robots and instructions respectively.
> Then follow N lines with two integers, 1 <= Xi <= A, 1 <= Yi <= B and one letter (N, S, E or W), giving the starting position and direction of each robot, in order from 1 through N. No two robots start at the same position.
> ![img](https://vj.csgrandeur.cn/5c7adf6dcd1e44166dc55094bc35f881?v=1663259332)
> Figure 1: The starting positions of the robots in the sample warehouse
> Finally there are M lines, giving the instructions in sequential order.
> An instruction has the following format:
> < robot #> < action> < repeat>
> Where is one of
> L: turn left 90 degrees,
> R: turn right 90 degrees, or
> F: move forward one meter,
> and 1 <= < repeat> <= 100 is the number of times the robot should perform this single move.

### output

> Output one line for each test case:
>
> - Robot i crashes into the wall, if robot i crashes into a wall. (A robot crashes into a wall if Xi = 0, Xi = A + 1, Yi = 0 or Yi = B + 1.)
> - Robot i crashes into robot j, if robots i and j crash, and i is the moving robot.
> - OK, if no crashing occurs.
>
> Only the first crash is to be reported.

### Sample

```
// input
4
5 4
2 2
1 1 E
5 4 W
1 F 7
2 F 7
5 4
2 4
1 1 E
5 4 W
1 F 3
2 F 1
1 L 1
1 F 3
5 4
2 2
1 1 E
5 4 W
1 L 96
1 F 2
5 4
2 3
1 1 E
5 4 W
1 F 4
1 L 1
1 F 20
// output
Robot 1 crashes into the wall
Robot 1 crashes into robot 2
OK
Robot 1 crashes into robot 2
```

### 代码

```cpp
#include <iostream>
#include <cstdio>
#include <string.h>
using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 1e2 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
int k, n, m, a, b;
PII dir[N];
int mp[N][N], arr[N];
int dx[4] = {1, 0, -1, 0};
int dy[4] = {0, 1, 0, -1};
int main ()
{
    cin >> k;
    while (k--) {
        memset(mp, 0, sizeof mp);
        cin >> a >> b;
        cin >> n >> m;
        for (int i = 1; i <= n; i++) {
            int x, y;
            char d;
            cin >> x >> y >> d;
            mp[x][y] = i;
            dir[i].first = x, dir[i].second = y;
            switch (d) {
                case 'N':
                    arr[i] = 1;
                    break;
                case 'E':
                    arr[i] = 0;
                    break;
                case 'S':
                    arr[i] = 3;
                    break;
                case 'W':
                    arr[i] = 2;
                    break;
            }
        }
        int flag = 0;
        for (int i = 1; i <= m; i++) {
            int r, f;
            char op;
            cin >> r >> op >> f;
            if (op == 'L') {
                arr[r] = (arr[r] + f) % 4;
            } else if (op == 'R') {
                arr[r] = ((arr[r] - f) % 4 + 4) % 4;
            } else {
                int midx = dir[r].first;
                int midy = dir[r].second;
                int fl = 0;
                for (int j = 1; j <= f; j++) {
                    midx += dx[arr[r]];
                    midy += dy[arr[r]];
                    if (midx >= 1 && midx <= a && midy >= 1 && midy <= b) {
                        if (mp[midx][midy] != 0 && !flag) {
                            flag = fl = 1;
                            cout << "Robot " << r << " crashes into robot " << mp[midx][midy] << "\n";
                            break;
                        }
                    } else {
                        if (!flag) {
                            flag = 1;
                            cout << "Robot " << r << " crashes into the wall\n";
                        }
                        fl = 1;
                        break;
                    }
                }
                if (!fl) {
                    mp[dir[r].first][dir[r].second] = 0;
                    mp[midx][midy] = r;
                    dir[r].first = midx;
                    dir[r].second = midy;
                }
            }
        }
        if (!flag) cout << "OK\n";
    }
    return 0;
}
```

## 思路

这个题的意思是：k组测试数据，给出a和b，代表仓库的列数和行数。给出n和m代表机器人的个数和指令的个数。然后给出每个机器人的初始位置和方向，然后给出机器人行走的指令，让你输出机器人撞墙或者碰到其他机器人的信息。

鉴定为，纯纯的模拟。