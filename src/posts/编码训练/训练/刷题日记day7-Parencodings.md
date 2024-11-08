---
title: 刷题日记day7-Parencodings
link: 刷题日记day7-Parencodings
catalog: true

date: 2022-09-21 21:10:00 
subtitle: 刷题第六天
tags:
- c++
- 算法
category:
- [题目记录, 题单]
---

# 刷题日记day7-Parencodings

今天没什么新鲜事儿，只觉得很瞌睡😪，好无聊啊！😢

买了几个挂钩，还想买把椅子。

这个题数据量很小，很简单的题。

```component VPCard
title: POJ-1068 Parencodings
desc: https://vjudge.net/problem/POJ-1068
link: https://vjudge.net/problem/POJ-1068
```

## 题面

Let S = s1 s2...s2n be a well-formed string of parentheses. S can be encoded in two different ways:

q By an integer sequence P = p1 p2...pn where pi is the number of left parentheses before the ith right parenthesis in S (P-sequence).

q By an integer sequence W = w1 w2...wn where for each right parenthesis, say a in S, we associate an integer which is the number of right parentheses counting from the matched left parenthesis of a up to a. (W-sequence).

Following is an example of the above encodings:

```
S	    (((()()())))
P-sequence	4 5 6666
W-sequence	1 1 1456
```

Write a program to convert P-sequence of a well-formed string to the W-sequence of the same string.

### input

> The first line of the input contains a single integer t (1 <= t <= 10), the number of test cases, followed by the input data for each test case. The first line of each test case is an integer n (1 <= n <= 20), and the second line is the P-sequence of a well-formed string. It contains n positive integers, separated with blanks, representing the P-sequence.

### output

> The output file consists of exactly t lines corresponding to test cases. For each test case, the output line should contain n integers describing the W-sequence of the string corresponding to its given P-sequence.

### Sample

```
// input
2
6
4 5 6 6 6 6
9 
4 6 6 6 6 8 9 9 9
// output
1 1 1 4 5 6
1 1 2 4 5 1 1 3 9
```

### 代码

```cpp
#include <iostream>
#include <stack>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 1e5 + 5, M = 1e5 + 5, INF = 0x3f3f3f3f;
int t, n, a[N], ans[N], pre[N];
char str[N];
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    cin >> t;
    while (t--) {
        cin >> n;
        for (int i = 1; i <= n; i++) cin >> a[i];
        int inx = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < a[i] - a[i - 1]; j++)
                str[inx++] = '(';
            str[inx++] = ')';
        }
        for (int i = 1; i < inx; i++)
            if (str[i] == '(') pre[i] = pre[i - 1] + 1;
            else pre[i] = pre[i - 1];
        int hnx = 1; stack<int> st;
        for (int i = 1; i < inx; i++) {
            if (str[i] == '(') st.push(i);
            else {
                int mid = st.top(); st.pop();
                ans[hnx++] = pre[i] - pre[mid - 1];
            }
        }
        for (int i = 1; i <= n; i++) cout << ans[i] << ' ';
        cout << '\n';
    }
    return 0;
}
```

## 思路

这个题的意思是：对于一种合法的括号序列，有p和q两种表达方式，p方式就是数组里存储每个右括号左侧的左括号的数量，q方式就是数组里存储每个右括号和和它匹配的左括号之间的左括号数量（包括这个左括号）。给出p方式，求出q方式的数组。

我的方法是根据p数组构建出整个括号序列（虽然麻烦但好懂），然后从左往右求一遍左括号的前缀和，然后再从左往右使用栈将左右括号一一匹配，顺便求出q数组。

