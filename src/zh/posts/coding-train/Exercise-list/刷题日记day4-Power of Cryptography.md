---
title: 刷题日记day4-Power of Cryptography
link: 刷题日记day4-Power of Cryptography
catalog: true
lang: cn
date: 2022-09-18 21:07:00 
subtitle: 刷题第四天
tags:
- c++
- 算法
categories:
- [题目记录, 题单]
---
# 刷题日记day4-Power of Cryptography

建议先看思路，再看代码，这题有亿点简单，但是容易想歪，比如说我。

写之前千万别看评论区，不然评论区有答案就没意思了。

{% links %}
- site: POJ-2109 Power of Cryptography
  url: https://vjudge.net/problem/POJ-2109
  color: pink
{% endlinks %} 

## 题面

Current work in cryptography involves (among other things) large prime numbers and computing powers of numbers among these primes. Work in this area has resulted in the practical use of results from number theory and other branches of mathematics once considered to be only of theoretical interest.
This problem involves the efficient computation of integer roots of numbers.
Given an integer n>=1 and an integer p>= 1 you have to write a program that determines the n th positive root of p. In this problem, given such integers n and p, p will always be of the form k to the nth. power, for an integer k (this integer is what your program must find).

### input

> The input consists of a sequence of integer pairs n and p with each integer on a line by itself. For all such pairs 1<=n<= 200, 1<=p<10101 and there exists an integer k, 1<=k<$10^9$ such that $k^n$ = p.

### output

> For each integer pair n and p the value k should be printed, i.e., the number k such that $k^n$ =p.

### Sample

```
// input
2 16
3 27
7 4357186184021382204544
// output
4
3
1234
```

### 代码

```cpp
#include <iostream>
#include <math.h>
using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 1e2 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
double n, p;
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    while (cin >> n >> p)
        cout << pow(p, 1.0 / n) << '\n';
    return 0;
}
```

## 思路

题目的意思是给你n和p，问你找到一个数k符和：
$$
k^n=p
$$
所以稍微变换一下就是：
$$
k=p^{\frac{1}{n}}
$$
就是这么简单，对吧。但是p的范围是`1~1e100`我一开始以为是高精度，但是奈何我不会高精度开方啊。难受死了，想了半天都不会，然后我无聊往下滚了一下，滑到了评论区，真绝了，直接调用`pow()`开方就过了，好像损失精度也并不会影响答案。就这*AC*了。

