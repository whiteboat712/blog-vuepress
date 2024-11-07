---
title: 刷题日记day16-Code
link: 刷题日记day16-Code
catalog: true
lang: cn
date: 2022-10-01 13:49:00 
subtitle: 刷题第十六天
tags:
- c++
- 算法
categories:
- [题目记录, 题单]
---
# 刷题日记day16-Code

纯纯的数学题，我是一点都不会啊，我就高中的数学水平，还真看不出来这是组合数。最后去网上找了体解才搞懂。呜呜呜~~~

{% links %}
- site: POJ-1850 Code
  url: https://vjudge.net/problem/POJ-1850
  color: pink
{% endlinks %} 

## 题面

Transmitting and memorizing information is a task that requires different coding systems for the best use of the available space. A well known system is that one where a number is associated to a character sequence. It is considered that the words are made only of small characters of the English alphabet a,b,c, ..., z (26 characters). From all these words we consider only those whose letters are in lexigraphical order (each character is smaller than the next character).

The coding system works like this:
• The words are arranged in the increasing order of their length.
• The words with the same length are arranged in lexicographical order (the order from the dictionary).
• We codify these words by their numbering, starting with a, as follows:
a - 1
b - 2
...
z - 26
ab - 27
...
az - 51
bc - 52
...
vwxyz - 83681
...

Specify for a given word if it can be codified according to this coding system. For the affirmative case specify its code.

### input

> The only line contains a word. There are some constraints:
> • The word is maximum 10 letters length
> • The English alphabet has 26 characters.

### output

> The output will contain the code of the given word, or 0 if the word can not be codified.

### Sample

```
// input
bf
// output
55
```

### 代码

```cpp
#include <iostream>
#include <string.h>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 10 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
char str[N];
ll num;
int c[30][30];
void init() {
    memset(c, 0, sizeof c);
    for (int i = 0; i < 30; i++) {
        c[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            c[i][j] = c[i - 1][j - 1] + c[i - 1][j];
        }
    }
}
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    init();
    cin >> str;
    int len = strlen(str);
    for (int i = 1; i < len; i++)
        if (str[i] <= str[i - 1]) {
            cout << '0';
            return 0;
        }
    ll ans = 0;
    for (int i = 1; i < len; i++) ans += c[26][i];
    for (int i = 0; i < len; i++) {
        char ch = i ? str[i - 1] + 1 : 'a';
        while (ch <= str[i] - 1) {
            ans += c['z' - ch][len - i - 1];
            ch++;
        }
    }
    cout << ans + 1;
    return 0;
}
```

## 思路

题目的意思是给定一个按照题目意思编码的字符串，让你把它还原为数字，就是一个变进制的问题。首先预处理出来前30个组合数。然后每次答案加上当前长度的组合数就行了。