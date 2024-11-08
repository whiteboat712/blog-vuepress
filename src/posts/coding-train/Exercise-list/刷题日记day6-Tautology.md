---
title: 刷题日记day6-Tautology
link: 刷题日记day6-Tautology
catalog: true

date: 2022-09-20 22:54:00 
subtitle: 刷题第六天
tags:
- c++
- 算法
category:
- [题目记录, 题单]
---
# 刷题日记day6-Tautology

电路真的好难，学不会了。不过今天新生来了还挺热闹的，回忆起了当初我刚来的时候。

这道题挺简单的，如果没见过使用栈来进行运算的题，可以见识一下这道题。

```component VPCard
title: POJ-3295 Tautology
desc: https://vjudge.net/problem/POJ-3295
link: https://vjudge.net/problem/POJ-3295
```

## 题面

WFF 'N PROOF is a logic game played with dice. Each die has six faces representing some subset of the possible symbols K, A, N, C, E, p, q, r, s, t. A Well-formed formula (WFF) is any string of these symbols obeying the following rules:

- p, q, r, s, and t are WFFs
- if *w* is a WFF, N*w* is a WFF
- if *w* and *x* are WFFs, K*wx*, A*wx*, C*wx*, and E*wx* are WFFs.

The meaning of a WFF is defined as follows:

- p, q, r, s, and t are logical variables that may take on the value 0 (false) or 1 (true).
- K, A, N, C, E mean *and, or, not, implies,* and *equals* as defined in the truth table below.

| w     x | Kwx  | Awx  | Nw   | Cwx  | Ewx  |
| ------- | ---- | ---- | ---- | ---- | ---- |
| 1     1 | 1    | 1    | 0    | 1    | 1    |
| 1     0 | 0    | 1    | 0    | 0    | 0    |
| 0     1 | 0    | 1    | 1    | 1    | 0    |
| 0     0 | 0    | 0    | 1    | 1    | 1    |

A *tautology* is a WFF that has value 1 (true) regardless of the values of its variables. For example, *ApNp* is a tautology because it is true regardless of the value of *p*. On the other hand, *ApNq* is not, because it has the value 0 for *p=0, q=1*.

You must determine whether or not a WFF is a tautology.

### input

> Input consists of several test cases. Each test case is a single line containing a WFF with no more than 100 symbols. A line containing 0 follows the last case.

### output

> For each test case, output a line containing *tautology* or *not* as appropriate.

### Sample

```
// input
ApNp
ApNq
0
// output
tautology
not
```

### 代码

```cpp
#include <iostream>
#include <stack>
#include <string.h>
using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
typedef pair<char, char> PCC;
const int N = 1e2 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
char str[N];
int len, p, q, r, s, t;
int f() {
    stack<int> st;
    for (int i = len - 1; i >= 0; i--) {
        if (str[i] == 'p') st.push(p);
        else if (str[i] == 'q') st.push(q);
        else if (str[i] == 'r') st.push(r);
        else if (str[i] == 's') st.push(s);
        else if (str[i] == 't') st.push(t);
        else if (str[i] == 'K') {
            int num1 = st.top(); st.pop();
            int num2 = st.top(); st.pop();
            if (num1 & num2) st.push(1);
            else st.push(0);
        } else if (str[i] == 'A') {
            int num1 = st.top(); st.pop();
            int num2 = st.top(); st.pop();
            if (num1 | num2) st.push(1);
            else st.push(0);
        } else if (str[i] == 'N') {
            int num = st.top(); st.pop();
            st.push(!num);
        } else if (str[i] == 'C') {
            int num1 = st.top(); st.pop();
            int num2 = st.top(); st.pop();
            if (num1 & !num2) st.push(0);
            else st.push(1);
        } else if (str[i] == 'E') {
            int num1 = st.top(); st.pop();
            int num2 = st.top(); st.pop();
            if (num1 ^ num2) st.push(0);
            else st.push(1);
        }
    }
    return st.top();
}
int solve() {
    for (p = 0; p <= 1; p++)
        for (q = 0; q <= 1; q++)
            for (r = 0; r <= 1; r++)
                for (s = 0; s <= 1; s++)
                    for (t = 0; t <= 1; t++)
                        if (f() == 0) return 0;
    return 1;
}
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    while (cin >> str) {
        if (str[0] == '0') break;
        len = strlen(str);
        int ans = solve();
        if (ans) cout << "tautology\n";
        else cout << "not\n";
    }
    return 0;
}
```

## 思路

这个题的意思是玩一个游戏，给你一个他定义的用字母表示的式子，里面参数是`p,q,r,s,t`这五个字母，有五种运算符`K(w&x)`,`A(w|x)`,`N(!w)`,`C(w|!x)`,`E(w^x)`，问你这个式子是不是重言式（就是永远为真）。

由于数据量很小，只有5个变量，所以只要枚举这5个变量的值然后计算一下整个式子的值就行，如果有结果为真的情况就直接输出`not`否则输出`tautology` 。

计算方法也很简单，可以使用递归也可以使用栈，我这里使用栈来运算，由于运算符在参数前面，所以我从后往前计算，遇见运算符就把栈中的值取出来运算，随后返回栈顶的值就是结果（正常也应该栈中就剩一个数据）。

