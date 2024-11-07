---
title: 刷题日记day3-Radar Installation
link: 刷题日记day3-Radar Installation
catalog: true
lang: cn
date: 2022-09-17 23:27:00 
subtitle: 刷题第三天
tags:
- c++
- 算法
categories:
- [题目记录, 题单]
---
# 刷题日记day3-Radar Installation

今天被突然到来的一场icpc网络赛打蒙了，一下午罚坐了5个小时，现在腰还是痛的，简直就是坐大牢。

今天练得题还是比较简单。

{% links %}
- site: POJ-1328 Radar Installation
  url: https://vjudge.net/problem/POJ-1328
  color: pink
{% endlinks %} 

## 题面

Assume the coasting is an infinite straight line. Land is in one side of coasting, sea in the other. Each small island is a point locating in the sea side. And any radar installation, locating on the coasting, can only cover d distance, so an island in the sea can be covered by a radius installation, if the distance between them is at most d.

We use Cartesian coordinate system, defining the coasting is the x-axis. The sea side is above x-axis, and the land side below. Given the position of each island in the sea, and given the distance of the coverage of the radar installation, your task is to write a program to find the minimal number of radar installations to cover all the islands. Note that the position of an island is represented by its x-y coordinates.
![img](https://vj.csgrandeur.cn/f6ffe515205096387436c13c7449b0ed?v=1663151667)
Figure A Sample Input of Radar Installations

### input

> The input consists of several test cases. The first line of each case contains two integers n (1<=n<=1000) and d, where n is the number of islands in the sea and d is the distance of coverage of the radar installation. This is followed by n lines each containing two integers representing the coordinate of the position of each island. Then a blank line follows to separate the cases.
>
> The input is terminated by a line containing pair of zeros

### output

> For each test case output one line consisting of the test case number followed by the minimal number of radar installations needed. "-1" installation means no solution for that case.

### Sample

```
// input
3 2
1 2
-3 1
2 1

1 2
0 2

0 0
// output
Case 1: 2
Case 2: 1
```

### 代码

```cpp
#include <math.h>
#include <algorithm>
#include <iostream>

using namespace std;
typedef long long ll;
typedef pair<double, double> PII;
const int N = 1e3 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
int n;
ll d;
PII isl[N]; // 记录各个岛被雷达覆盖的雷达的左右范围
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int cas = 1;    // 记录第几组
    while (cin >> n >> d) {
        if (n == 0 && d == 0) break;    // 结束
        cout << "Case " << cas << ": ";
        int flag = 0;
        for (int i = 1; i <= n; i++) {
            int x, y;
            cin >> x >> y;
            if (y > d) flag = -1;   // y大于雷达范围，此时不存在方案可以覆盖这个岛
            isl[i].first = x - sqrt((double)(d * d - y * y));   // 左端点
            isl[i].second = x + sqrt((double)(d * d - y * y));  // 右端点
        }
        sort(isl + 1, isl + n + 1); // 按左端点排序
        int ans = 1;
        double r = isl[1].second;   // 范围
        for (int i = 2; i <= n; i++) {
            if (isl[i].first <= r)
                r = min(r, isl[i].second);  // 覆盖的到，更新范围
            else
                r = isl[i].second, ans++;   // 覆盖不到，加一个新雷达
        }
        if (flag == -1)
            cout << -1 << '\n';
        else
            cout << ans << '\n';
        cas++;
    }
    return 0;
}
```

## 思路

哈哈哈，可能有人和我一开始的思路一样，想着怎么通过雷达来算的位置，然后直到不能被雷达包括为止，但是这样很难行得通，或者说实现起来太复杂了，如何确定雷达的位置，我自己是想了好久，一直想不到。

所以，

正确答案是，反向思维，通过点来确定雷达的位置，因为对于一个点能覆盖它的雷达的位置有一个范围，这个范围是很好算的，这样只要确定每个点的这个范围，然后按左端点或右端点排一下序，然后贪心就能计算出答案了。