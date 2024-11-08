---
title: 刷题日记day14-The Cow Lexicon
link: 刷题日记day14-The Cow Lexicon
catalog: true

date: 2022-09-28 23:59:00 
subtitle: 刷题第十四天
tags:
- c++
- 算法
category:
- [题目记录, 题单]
---
# 刷题日记day14-The Cow Lexicon

又是水题，但是我叕写了很长时间，ε=(´ο｀*)))唉，真是太粗心了，一直没debug出来，犯了很多低级错误。

```component VPCard
title: POJ-3267 The Cow Lexicon
desc: https://vjudge.net/problem/POJ-3267
link: https://vjudge.net/problem/POJ-3267
```

## 题面

Few know that the cows have their own dictionary with *W* (1 ≤ *W* ≤ 600) words, each containing no more 25 of the characters 'a'..'z'. Their cowmunication system, based on mooing, is not very accurate; sometimes they hear words that do not make any sense. For instance, Bessie once received a message that said "browndcodw". As it turns out, the intended message was "browncow" and the two letter "d"s were noise from other parts of the barnyard.

The cows want you to help them decipher a received message (also containing only characters in the range 'a'..'z') of length *L* (2 ≤ *L* ≤ 300) characters that is a bit garbled. In particular, they know that the message has some extra letters, and they want you to determine the smallest number of letters that must be removed to make the message a sequence of words from the dictionary.

### input

> Line 1: Two space-separated integers, respectively: *W* and *L*
> Line 2: *L* characters (followed by a newline, of course): the received message
> Lines 3..*W*+2: The cows' dictionary, one word per line

### output

> Line 1: a single integer that is the smallest number of characters that need to be removed to make the message a sequence of dictionary words.

### Sample

```
// input
6 10
browndcodw
cow
milk
white
black
brown
farmer
// output
2
```

### 代码

```cpp
#include <iostream>
#include <string.h>


using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 6e2 + 5, M = 3e2 + 5, INF = 0x3f3f3f3f;
int w, l;
char word[N][30];
char msg[M];
int dp[M], inx[26][M];
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    cin >> w >> l;
    cin >> (msg + 1);
    for (int i = 1; i <= w; i++) cin >> word[i];
    for (int i = 0; i < 26; i++) inx[i][0] = -1;
    // 这里求每个字母每个位置前一个坐标
    for (int i = 1; i <= l; i++) {
        inx[msg[i] - 'a'][i] = i;
        for (int j = 0; j < 26; j++)
            if (msg[i] - 'a' != j) inx[j][i] = inx[j][i - 1];
    }
    dp[0] = 0;
    for (int i = 1; i <= l; i++) {
        dp[i] = dp[i - 1] + 1;
        for (int j = 1; j <= w; j++) {
            int len = strlen(word[j]);
            if (i >= len) {
                int x = i;
                bool flag = true;
                for (int k = len - 1; k >= 0; k--) {
                    x = inx[word[j][k] - 'a'][x];
                    if (x == -1) {
                        flag = false;
                        break;
                    }
                    x--;
                }
                if (flag) dp[i] = min(dp[i], dp[x] + i - x - len);
            }
        }
    }
    cout << dp[l] << '\n';
    return 0;
}
```

## 思路

题目的意思是奶牛们有很多单词，给你一个字符串，给你很多单词，问你这个字符串可以由这些单词拼成，且最少有几个多出来的字母。

dp式子：
$$
dp[j] = max(dp[j - 1] + 1, j - F(i, j) + len(i) )
$$
F(i,j)表示对于字符串的前j个字符，找到第i个单词的第一个字母的下标 - 1,如果没找到就不进行更新。

dp[L]即为答案。

