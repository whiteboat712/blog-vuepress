---
title: 刷题日记day10-Currency Exchange
link: 刷题日记day10-Currency Exchange
catalog: true
lang: cn
date: 2022-09-24 23:59:00 
subtitle: 刷题第十天
tags:
- c++
- 算法
categories:
- [题目记录, 题单]
---
# 刷题日记day10-Currency Exchange

开始做图论的题了，第一天就有点难，贝尔曼福特算法已经忘光光了。

今天去和lxc他们玩了一晚上桌游，很开心捏😘

{% links %}
- site: POJ-1860 Currency Exchange
  url: https://vjudge.net/problem/POJ-1860
  color: pink
{% endlinks %} 

## 题面

Several currency exchange points are working in our city. Let us suppose that each point specializes in two particular currencies and performs exchange operations only with these currencies. There can be several points specializing in the same pair of currencies. Each point has its own exchange rates, exchange rate of A to B is the quantity of B you get for 1A. Also each exchange point has some commission, the sum you have to pay for your exchange operation. Commission is always collected in source currency.
For example, if you want to exchange 100 US Dollars into Russian Rubles at the exchange point, where the exchange rate is 29.75, and the commission is 0.39 you will get (100 - 0.39) * 29.75 = 2963.3975RUR.
You surely know that there are N different currencies you can deal with in our city. Let us assign unique integer number from 1 to N to each currency. Then each exchange point can be described with 6 numbers: integer A and B - numbers of currencies it exchanges, and real RAB, CAB, RBA and CBA - exchange rates and commissions when exchanging A to B and B to A respectively.
Nick has some money in currency S and wonders if he can somehow, after some exchange operations, increase his capital. Of course, he wants to have his money in currency S in the end. Help him to answer this difficult question. Nick must always have non-negative sum of money while making his operations.

### input

> The first line of the input contains four numbers: N - the number of currencies, M - the number of exchange points, S - the number of currency Nick has and V - the quantity of currency units he has. The following M lines contain 6 numbers each - the description of the corresponding exchange point - in specified above order. Numbers are separated by one or more spaces. 1<=S<=N<=100, 1<=M<=100, V is real number, 0<=V<=103.
> For each point exchange rates and commissions are real, given with at most two digits after the decimal point, 10-2<=rate<=102, 0<=commission<=102.
> Let us call some sequence of the exchange operations simple if no exchange point is used more than once in this sequence. You may assume that ratio of the numeric values of the sums at the end and at the beginning of any simple sequence of the exchange operations will be less than 104.

### output

> If Nick can increase his wealth, output YES, in other case output NO to the output file.

### Sample

```
// input
3 2 1 20.0
1 2 1.00 1.00 1.00 1.00
2 3 1.10 1.00 1.10 1.00
// output
YES
```

### 代码

```cpp
#include <iostream>
#include <string.h>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 1e2 + 5, M = 2e2 + 5, INF = 0x3f3f3f3f;
struct edge {
    int a, b;
    double r, c;
} edges[M];
int n, m, s;
double v, dist[N];

bool bellman_ford() {
    dist[s] = v;
    for (int i = 1; i < n; i++) {
        bool flag = false;
        for (int j = 1; j <= 2 * m; j++) {
            edge mid = edges[j];
            if (dist[mid.b] < (dist[mid.a] - mid.c) * mid.r) {
                flag = true;
                dist[mid.b] = (dist[mid.a] - mid.c) * mid.r;
            }
        }
        if (!flag) return false;
    }
    for (int i = 1; i <= 2 * m; i++) {
        edge mid = edges[i];
        if (dist[mid.b] < (dist[mid.a] - mid.c) * mid.r)
            return true;
    }
    return false;
}
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    cin >> n >> m >> s >> v;
    for (int i = 0; i < m; i++) {
        int a, b;
        double r1, c1, r2, c2;
        cin >> a >> b >> r1 >> c1 >> r2 >> c2;
        edges[i * 2 + 1].a = a, edges[i * 2 + 1].b = b, edges[i * 2 + 1].r = r1, edges[i * 2 + 1].c = c1;
        edges[i * 2 + 2].a = b, edges[i * 2 + 2].b = a, edges[i * 2 + 2].r = r2, edges[i * 2 + 2].c = c2;
    }
    cout << ((bellman_ford()) ? "YES\n" : "NO\n");
    return 0;
}
```

## 思路

做法，贝尔曼福特算法求负环，如果有负环说明可以通过一个循环达到赚钱。