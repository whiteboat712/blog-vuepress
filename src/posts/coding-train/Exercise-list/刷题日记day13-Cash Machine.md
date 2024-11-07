---
title: 刷题日记day13-Cash Machine
link: 刷题日记day13-Cash Machine
catalog: true
lang: cn
date: 2022-09-27 23:59:00 
subtitle: 刷题第十三天
tags:
- c++
- 算法
categories:
- [题目记录, 题单]
---
# 刷题日记day13-Cash Machine

本来是一道简单的题，但是我忘了怎么做了，耽误了很多时间，麻了。

今天跑了好几公里，感觉还行，至少比以前身体好点了。

{% links %}
- site: POJ-1276 Cash Machine
  url: https://vjudge.net/problem/POJ-1276
  color: pink
{% endlinks %} 

## 题面

A Bank plans to install a machine for cash withdrawal. The machine is able to deliver appropriate @ bills for a requested cash amount. The machine uses exactly N distinct bill denominations, say Dk, k=1,N, and for each denomination Dk the machine has a supply of nk bills. For example,

N=3, n1=10, D1=100, n2=4, D2=50, n3=5, D3=10

means the machine has a supply of 10 bills of @100 each, 4 bills of @50 each, and 5 bills of @10 each.

Call cash the requested amount of cash the machine should deliver and write a program that computes the maximum amount of cash less than or equal to cash that can be effectively delivered according to the available bill supply of the machine.

Notes:
@ is the symbol of the currency delivered by the machine. For instance, @ may stand for dollar, euro, pound etc.

### input

> The program input is from standard input. Each data set in the input stands for a particular transaction and has the format:
>
> cash N n1 D1 n2 D2 ... nN DN
>
> where 0 <= cash <= 100000 is the amount of cash requested, 0 <=N <= 10 is the number of bill denominations and 0 <= nk <= 1000 is the number of available bills for the Dk denomination, 1 <= Dk <= 1000, k=1,N. White spaces can occur freely between the numbers in the input. The input data are correct.

### output

> For each set of data the program prints the result to the standard output on a separate line as shown in the examples below.

### Sample

```
// input
735 3  4 125  6 5  3 350
633 4  500 30  6 100  1 5  0 1
735 0
0 3  10 100  10 50  10 10
// output
735
630
0
0
```

### 代码

```cpp
#include <iostream>
#include <string.h>
#include <vector>
using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 10 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
ll cash, n, a[N], b[N];
vector<ll> goods;
int dp[M];
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    while (cin >> cash >> n) {
        goods.clear();
        for (int i = 1; i <= n; i++) cin >> b[i] >> a[i];
        for (int i = 1; i <= n; i++) {
            int j;
            for (j = 1; j <= b[i]; j <<= 1) {
                goods.push_back(j * a[i]);
                b[i] -= j;
            }
            if (b[i]) goods.push_back(b[i] * a[i]);
        }
        memset(dp, 0, sizeof dp);
        dp[0] = 1;
        for (int i = 0; i < goods.size(); i++)
            for (int j = cash; j >= goods[i]; j--)
                dp[j] = max(dp[j], dp[j - goods[i]]);
        for (int i = cash; i >= 0; i--)
            if (dp[i]) {
                cout << i << '\n';
                break;
            }
    }
    return 0;
}
```

## 思路

题目的意思是银行有一个取款机，里面有不同的种类的票子，给你顾客要取的钱，还有存款机里各种票子的面值和数量，问你取款机最多能给顾客多少钱（不能超过顾客要的钱）。

就是个十分简单的多重背包dp，原本复杂度为O(n * cash * d)，太慢，所以要使用二进制优化一下。优化后时间复杂度是O((n + log d) * cash)。

dp式子：
$$
dp[j] = max(dp[j], dp[j - goods[i]])
$$
找到最靠近cash的dp不为零的就是答案了。