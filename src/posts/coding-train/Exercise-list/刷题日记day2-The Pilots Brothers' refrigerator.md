---
title: 刷题日记day2-The Pilots Brothers' refrigerator
link: 刷题日记day2-The Pilots Brothers' refrigerator
catalog: true
lang: cn
date: 2022-09-16 17:50:00 
subtitle: 刷题第二天
tags:
- c++
- 算法
categories:
- [题目记录, 题单]
---
# 刷题日记day2-The Pilots Brothers' refrigerator

今天来开开心心的做第二道题喽。
{% links %}
- site: POJ-2965 The Pilots Brothers' refrigerator
  url: https://vjudge.net/problem/POJ-2965
  color: pink
{% endlinks %} 

感觉好像一天一道题有一点少呀。但是最近课程有点忙，心累啊！😂

明天就icpc网络赛了，好慌啊，上次ccpc真的要被钉在耻辱柱上了。

## 题面

The game “The Pilots Brothers: following the stripy elephant” has a quest where a player needs to open a refrigerator.

There are 16 handles on the refrigerator door. Every handle can be in one of two states: open or closed. The refrigerator is open only when all handles are open. The handles are represented as a matrix 4х4. You can change the state of a handle in any location **[i, j]** (1 ≤ i, j ≤ 4). However, this also changes states of all handles in row **i** and all handles in column **j**.

The task is to determine the minimum number of handle switching necessary to open the refrigerator.

### input

> The input contains four lines. Each of the four lines contains four characters describing the initial state of appropriate handles. A symbol “+” means that the handle is in closed state, whereas the symbol “−” means “open”. At least one of the handles is initially closed.

### output

> The first line of the input contains N – the minimum number of switching. The rest N lines describe switching sequence. Each of the lines contains a row number and a column number of the matrix separated by one or more spaces. If there are several solutions, you may give any one of them.

### Sample

```
// input
-+--
----
----
-+--
// output
6
1 1
1 3
1 4
4 1
4 3
4 4
```

### 代码

```cpp
#include <iostream>
#include <vector>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 2 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
char mp[N][N];
int ma[N][N], mid[N][N];
// 翻转这个门把手
void turn(int x, int y) {
    for (int i = 1; i <= 4; i++)
        mid[x][i] = !mid[x][i];
    for (int i = 1; i <= 4; i++)
        mid[i][y] = !mid[i][y];
    mid[x][y] = !mid[x][y];
}
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    for (int i = 1; i <= 4; i++) cin >> mp[i] + 1;
    for (int i = 1; i <= 4; i++)
        for (int j = 1; j <= 4; j++)
            if (mp[i][j] == '+') ma[i][j] = 1;
    vector<PII> ans;
    for (int i = 1; i <= 4; i++)
        for (int j = 1; j <= 4; j++) {
            if (ma[i][j]) turn(i, j);
        }
    for (int i = 1; i <= 4; i++)
        for (int j = 1; j <= 4; j++)
            if (mid[i][j]) {
                // 本来是一句ans.push_back({i, j})就可以搞定的，但是POJ的破编译器不支持
                PII x;
                x.first = i, x.second = j;
                ans.push_back(x);
            }
    cout << ans.size() << '\n';
    for (int i = 0; i < ans.size(); i++)
        cout << ans[i].first << ' ' << ans[i].second << '\n';
    return 0;
}
```

## 思路

一开始一直在想是不是像昨天那个题一样，有没有什么规律可循。但是一直想不出来，后来稍微算了一下，如果状态压缩枚举大概是$2^{16}*16$的复杂度也就一百万左右，TimeLimit是1s应该是不会超时的，然后写了一下，TLE了。我不理解，真不理解。

没有办法，然后突然发现，重开一个数组，把原数组所有+号的地方转变一下方向，计数在新数组上，这里所有要转变奇数次的地方就是我们的答案（因为偶数次的改变等于没有改变），所以这样只要把计数是奇数的位置的坐标存入答案就行啦。