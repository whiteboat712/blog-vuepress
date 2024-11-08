---
title: 刷题日记day15-Alignment
link: 刷题日记day15-Alignment
catalog: true

date: 2022-09-29 23:59:00 
subtitle: 刷题第十五天
tags:
- c++
- 算法
category:
- [题目记录, 题单]
---
# 刷题日记day15-Alignment

最大上升子序列模板题。

```component VPCard
title: POJ-1836 Alignment
desc: https://vjudge.net/problem/POJ-1836
link: https://vjudge.net/problem/POJ-1836
```

## 题面

In the army, a platoon is composed by n soldiers. During the morning inspection, the soldiers are aligned in a straight line in front of the captain. The captain is not satisfied with the way his soldiers are aligned; it is true that the soldiers are aligned in order by their code number: 1 , 2 , 3 , . . . , n , but they are not aligned by their height. The captain asks some soldiers to get out of the line, as the soldiers that remain in the line, without changing their places, but getting closer, to form a new line, where each soldier can see by looking lengthwise the line at least one of the line's extremity (left or right). A soldier see an extremity if there isn't any soldiers with a higher or equal height than his height between him and that extremity.

Write a program that, knowing the height of each soldier, determines the minimum number of soldiers which have to get out of line.

### input

> On the first line of the input is written the number of the soldiers n. On the second line is written a series of n floating numbers with at most 5 digits precision and separated by a space character. The k-th number from this line represents the height of the soldier who has the code k (1 <= k <= n).
>
> There are some restrictions:
> • 2 <= n <= 1000
> • the height are floating numbers from the interval [0.5, 2.5]

### output

> The only line of output will contain the number of the soldiers who have to get out of the line.

### Sample

```
// input
8
1.86 1.86 1.30621 2 1.4 1 1.97 2.2
// output
4
```

### 代码

```cpp
#include <iostream>
#include <string.h>
using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 1005, M = 1e5 + 5, INF = 0x3f3f3f3f;
int n;
double h[N];
int dp[2][N];
int main ()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    while (cin >> n) {
        for (int i = 1; i <= n; i++) cin >> h[i];
        memset(dp, 0, sizeof dp);
        dp[1][n] = dp[0][1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[0][i] = 1;
            for (int j = i - 1; j >= 1; j--)
                if (h[j] < h[i])
                    dp[0][i] = max(dp[0][i], dp[0][j] + 1);
        }
        for (int i = n - 1; i >= 1; i--) {
            dp[1][i] = 1;
            for (int j = i + 1; j <= n; j++)
                if (h[j] < h[i])
                    dp[1][i] = max(dp[1][i], dp[1][j] + 1);
        }
        int ans = dp[0][n];
        for (int i = 1; i < n; i++)
            for (int j = i + 1; j <= n; j++)
                ans = max(ans, dp[0][i] + dp[1][j]);
        cout << n - ans << '\n';
    }
    return 0;
}
```

## 思路

题目的意思是有一列士兵，每个人身高不一样，问你最少去掉几个人才能让队伍有序，有序的意思是留在队伍里的人至少能看见左右的排头中的一个（队伍应该是一个两边高中间低的造型）

因为数据范围比较小，连优化都不用，直接从后往前求一遍最大上升子序列，然后从前往后再求一遍最大上升子序列，然后对每个点枚举一下看哪个最大就能求出留在队里最多的人了。