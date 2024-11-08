---
title: 刷题日记day11-Wormholes
link: 刷题日记day11-Wormholes
catalog: true

date: 2022-09-25 23:32:00 
subtitle: 刷题第十一天
tags:
- c++
- 算法
category:
- [题目记录, 题单]
---
# 刷题日记day11-Wormholes

开始做图论的题的第二天，今天打icpc真难，不过还好手速快，过了三题，但是队伍排名还在800名左右，仰望hpy大佬。

今天这一题做个简单的Floyd算法安慰一下我的心灵。

```component VPCard
title: POJ-3259 Wormholes
desc: https://vjudge.net/problem/POJ-3259
link: https://vjudge.net/problem/POJ-3259
```

## 题面

While exploring his many farms, Farmer John has discovered a number of amazing wormholes. A wormhole is very peculiar because it is a one-way path that delivers you to its destination at a time that is BEFORE you entered the wormhole! Each of FJ's farms comprises *N* (1 ≤ *N* ≤ 500) fields conveniently numbered 1..*N*, *M* (1 ≤ *M* ≤ 2500) paths, and *W* (1 ≤ *W* ≤ 200) wormholes.

As FJ is an avid time-traveling fan, he wants to do the following: start at some field, travel through some paths and wormholes, and return to the starting field a time before his initial departure. Perhaps he will be able to meet himself :) .

To help FJ find out whether this is possible or not, he will supply you with complete maps to *F* (1 ≤ *F* ≤ 5) of his farms. No paths will take longer than 10,000 seconds to travel and no wormhole can bring FJ back in time by more than 10,000 seconds.

### input

> Line 1: A single integer, *F*. *F* farm descriptions follow.
> Line 1 of each farm: Three space-separated integers respectively: *N*, *M*, and *W*
> Lines 2..*M*+1 of each farm: Three space-separated numbers (*S*, *E*, *T*) that describe, respectively: a bidirectional path between *S* and *E* that requires *T* seconds to traverse. Two fields might be connected by more than one path.
> Lines *M*+2..*M*+*W*+1 of each farm: Three space-separated numbers (*S*, *E*, *T*) that describe, respectively: A one way path from *S* to *E* that also moves the traveler back *T* seconds.

### output

> Lines 1..*F*: For each farm, output "YES" if FJ can achieve his goal, otherwise output "NO" (do not include the quotes).

### Sample

```
// input
2
3 3 1
1 2 2
1 3 4
2 3 1
3 1 3
3 2 1
1 2 3
2 3 4
3 1 8
// output
NO
YES
```

### 代码

```cpp
#include <string.h>
#include <iostream>

using namespace std;
typedef long long ll;
typedef pair<int, int> PII;
const int N = 5e2 + 5, M = 3e3 + 5, INF = 0x3f3f3f3f;
int dist[N][N], f, n, m, w;

bool floyd() {
    for (int i = 1; i <= n; i++)
        for (int k = 1; k <= n; k++)
            if (dist[i][k] != 0x3f3f3f3f)
                for (int j = 1; j <= n; j++)
                    if (dist[i][j] > dist[i][k] + dist[k][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
    for (int i = 1; i <= n; i++)
        if (dist[i][i] < 0)
            return true;
    return false;
}
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    cin >> f;
    while (f--) {
        memset(dist, 0x3f, sizeof dist);
        cin >> n >> m >> w;
        for (int i = 1; i <= n; i++) dist[i][i] = 0;
        for (int i = 1; i <= m; i++) {
            int s, e, t;
            cin >> s >> e >> t;
            dist[s][e] = dist[e][s] = min(dist[s][e], t);
        }
        for (int i = 1; i <= w; i++) {
            int s, e, t;
            cin >> s >> e >> t;
            dist[s][e] = min(dist[s][e], -t);
        }
        bool ans = floyd();
        cout << (ans ? "YES" : "NO") << '\n';
    }
    return 0;
}
```

## 思路

求负环，有负环就输出`YES`否则就输出`NO`。