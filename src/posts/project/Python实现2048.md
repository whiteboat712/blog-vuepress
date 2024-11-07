---
title: Python实现2048
link: Python实现2048
catalog: true
lang: cn
date: 2022-10-04 23:52:00 
subtitle: 项目实战
tags:
- python
- 项目实战
categories:
- [项目实践]
---
# Python实现2048

看到某网站上有一门实战课，所以就跑过来跟着实现一下这个。

应该不难吧，哈哈哈。

## 技术栈

- Python 基本知识
- curses 终端图形编程库
- random 随机数模块
- collections 容器数据类型库
- 状态机的概念

## 实现过程

在根目录下创建游戏文件 `2048.py`

导入需要的包

```python
# curses 用来在终端上显示图形界面
import curses
# random 模块用来生成随机数
from random import randrange, choice
# collections 提供了一个字典的子类 defaultdict。可以指定 key 值不存在时，value 的默认值。
from collections import defaultdict
```

---

*PS：这个curses后面真的折磨了我好久*

### 主逻辑

#### 用户行为

所有的有效输入都可以转换为"上，下，左，右，游戏重置，退出"这六种行为，用 `actions` 表示

`actions = ['Up', 'Left', 'Down', 'Right', 'Restart', 'Exit']`

有效输入键是最常见的 W（上），A（左），S（下），D（右），R（重置），Q（退出），这里要考虑到大写键开启的情况，获得有效键值列表：

```python
# ord() 函数以一个字符作为参数，返回参数对应的 ASCII 数值，便于和后面捕捉的键位关联
letter_codes = [ord(ch) for ch in 'WASDRQwasdrq']
```

将输入与行为进行关联：

`actions_dict = dict(zip(letter_codes, actions * 2))`

```
# actions_dict 的输出结果为
{87: 'Up', 65: 'Left', 83: 'Down', 68: 'Right', 82: 'Restart', 81: 'Exit', 119: 'Up', 97: 'Left', 115: 'Down', 100: 'Right', 114: 'Restart', 113: 'Exit'}
```

#### 状态机

处理游戏主逻辑的时候我们会用到一种十分常用的技术：状态机，或者更准确的说是有限状态机（FSM）

你会发现 2048 游戏很容易就能分解成几种状态的转换。

![2.1-1](https://doc.shiyanlou.com/document-uid8834labid1172timestamp1468333673772.png)

`state` 存储当前状态， `state_actions` 这个词典变量作为状态转换的规则，它的 key 是状态，value 是返回下一个状态的函数：

- Init: init()
- Game
- Game: game()
- Game
- Win
- GameOver
- Exit
- Win: lambda: not_game('Win')
- Init
- Exit
- Gameover: lambda: not_game('Gameover')
- Init
- Exit
- Exit: 退出循环

状态机会不断循环，直到达到 Exit 终结状态结束程序。

下面我们来理清主逻辑的代码：

**init函数**用来初始化我们的游戏棋盘，使游戏变成初始状态。

![初始化棋盘](https://doc.shiyanlou.com/courses/uid1135941-20190917-1568702978805)

```python
def init():
  ''' 初始化游戏棋盘 '''
  return 'Game'
```

**not_game函数**表示的是游戏结束时的状态。游戏结束时，只有胜利和失败两种结果。在展示这两种结果的同时，我们还需要为玩家提供“Restart”和“Exit”功能。

![img](https://doc.shiyanlou.com/courses/uid1135941-20190917-1568703001349/wm) ![img](https://doc.shiyanlou.com/courses/uid1135941-20190917-1568702994843/wm)

```python
def not_game(state):
  '''展示游戏结束界面。
        读取用户输入得到 action，判断是重启游戏还是结束游戏
        '''
  # defaultdict 参数是 callable 类型，所以需要传一个函数
  responses = defaultdict(lambda: state)
  # 在字典中新建两个键值对
  responses['Restart'], responses['Exit'] = 'Init', 'Exit'
  return responses[action]
```

这里 `defaultdict` 作用是生成一个特殊的字典 `responses`。 在普通的字典里，我们都知道如果使用字典里不存在的 key 来取 value，程序就会报错。 但在 `defaultdict` 生成的特殊字典里，如果要取的 key 不存在，程序不仅不会报错，还能取到一个我们设定的默认 value 值。 也就是说，在 `responses` 这个特殊字典里，`responses[action]` 在 `action` 为 `'Restart'` 、`'Exit'` 这两种行为时分别对应 `'Init'` 和 `'Exit'` 状态。 在 key`action` 为 `actions = ['Up', 'Left', 'Down', 'Right', 'Restart', 'Exit']` 中的其他行为时，对应的都是默认的 value`state`。

这样一来，在游戏结束界面，玩家输入 r 和 q 以外的键位都不能对游戏界面造成影响。

**game函数**表示的是游戏进行时的状态，在不重新开始或退出的情况下，只要游戏没有胜利或失败，就会一直处于游戏状态。

![游戏状态](https://doc.shiyanlou.com/courses/uid1135941-20190917-1568703007082)

```python
def game():
  '''画出当前棋盘状态
        读取用户输入得到 action
        '''
  if action == 'Restart':
    return 'Init'
  if action == 'Exit':
    return 'Exit'
  # if 成功移动了一步:
  if 游戏胜利了:
    return 'Win'
  if 游戏失败了:
    return 'Gameover'
  return 'Game'
```

这里同样会获取用户输入得到 `action`。 当 `action` 为 `'Restart'`、`'Exit'`时会执行“Restart”、“Exit”功能。 不同的是，当 `action` 为 `'Up'`、`'Left'`、`'Down'`、`'Right'` 行为时，棋盘会进行相应移动一次，然后判断游戏是否结束。如果结束就返回相应的结束状态，没有结束就返回状态 `'Game'`，表示还在游戏进行状态。

### 用户输入处理

阻塞＋循环，直到获得用户有效输入才返回对应行为：

```python
def get_user_action(keyboard):
    char = "N"
    while char not in actions_dict:
        # 返回按下键位的 ASCII　码值
        char = keyboard.getch()
    # 返回输入键位对应的行为
    return actions_dict[char]
```

### 创建棋盘

初始化棋盘的参数，可以指定棋盘的高和宽以及游戏胜利条件，默认是最经典的 4x4 ～ 2048。

```python
class GameField(object):
    def __init__(self, height=4, width=4, win=2048):
        self.height = height       # 高
        self.width = width         # 宽
        self.win_value = 2048      # 过关分数
        self.score = 0             # 当前分数
        self.highscore = 0         # 最高分
        self.reset()               # 棋盘重置
```

### 棋盘操作

#### 随机生成一个 2 或者 4

```python
def spawn(self):
    # 从 100 中取一个随机数，如果这个随机数大于 89，new_element 等于 4，否则等于 2
    new_element = 4 if randrange(100) > 89 else 2
    # 得到一个随机空白位置的元组坐标
    (i,j) = choice([(i,j) for i in range(self.width) for j in range(self.height) if self.field[i][j] == 0])
    self.field[i][j] = new_element
```

按照游戏规则，这里需要在棋盘中随机找到一个空白的位置，并在这个位置上随机生成一个 2 或 4。 于是，我们用到了 `random` 库的 `randrange` 和 `choice` 方法。`randrange` 用法参考上面代码块中的注释。 `choice` 方法会从一个非空的序列（list、str、tuple 等）中随机返回一个元素。可是我们需要知道象征着棋盘的这个二维数组的 i 和 j 才能确定棋盘上的位置。 因此，在上面的代码中，我们往 `choice` 方法中传入一个列表，并在列表生成式中将二维数组变成一个以 (i,j) 为元素的列表，同时排除掉非零的位置。

#### 重置棋盘

```python
def reset(self):
    # 更新分数
    if self.score > self.highscore:
        self.highscore = self.score
    self.score = 0
    # 初始化游戏开始界面
    self.field = [[0 for i in range(self.width)] for j in range(self.height)]
    self.spawn()
    self.spawn()
```

`reset` 方法在棋盘初始化的时候被调用。它的主要作用是将棋盘所有位置元素复原为 0，然后再在随机位置生成游戏初始的数值。

#### 一行向左合并

(注：这一操作是在 move 内定义的，拆出来是为了方便阅读)

```python
def move_row_left(row):
    def tighten(row):
        '''把零散的非零单元挤到一块'''
        # 先将非零的元素全拿出来加入到新列表
        new_row = [i for i in row if i != 0]
        # 按照原列表的大小，给新列表后面补零
        new_row += [0 for i in range(len(row) - len(new_row))]
        return new_row

    def merge(row):
        '''对邻近元素进行合并'''
        pair = False
        new_row = []
        for i in range(len(row)):
            if pair:
                # 合并后，加入乘 2 后的元素在 0 元素后面
                new_row.append(2 * row[i])
                # 更新分数
                self.score += 2 * row[i]
                pair = False
            else:
                # 判断邻近元素能否合并
                if i + 1 < len(row) and row[i] == row[i + 1]:
                    pair = True
                    # 可以合并时，新列表加入元素 0
                    new_row.append(0)
                else:
                    # 不能合并，新列表中加入该元素
                    new_row.append(row[i])
        # 断言合并后不会改变行列大小，否则报错
        assert len(new_row) == len(row)
        return new_row
    # 先挤到一块再合并再挤到一块
    return tighten(merge(tighten(row)))
```

#### 矩阵转置与矩阵逆转

加入这两个操作可以大大节省我们的代码量，减少重复劳动。

矩阵转置：

![矩阵转置](https://doc.shiyanlou.com/courses/uid1135941-20190917-1568703017335)

对于像我们棋盘一样，4 × 4 的二维矩阵，我们可以直接利用 Python 内置的 zip(*) 方法来进行矩阵转置。

```python
def transpose(field):
    return [list(row) for row in zip(*field)]
```

矩阵逆转（不是逆矩阵）：

这里只是将矩阵的每一行倒序，和逆矩阵的概念无关。

```python
def invert(field):
    return [row[::-1] for row in field]
```

#### 棋盘走一步

通过对矩阵进行转置与逆转，可以直接从左移得到其余三个方向的移动操作

(注：这里省略 move 函数里的部分代码)

```python
def move(self, direction):
    # 创建 moves 字典，把不同的棋盘操作作为不同的 key，对应不同的方法函数
    moves = {}
    moves['Left']  = lambda field: [move_row_left(row) for row in field]
    moves['Right'] = lambda field: invert(moves['Left'](invert(field)))
    moves['Up']    = lambda field: transpose(moves['Left'](transpose(field)))
    moves['Down']  = lambda field: transpose(moves['Right'](transpose(field)))
    # 判断棋盘操作是否存在且可行
    if direction in moves:
        if self.move_is_possible(direction):
            self.field = moves[direction](self.field)
            self.spawn()
            return True
        else:
            return False
```

在 `moves` 字典中有 `Left`、`Right`、`Up`、`Down` 四个 key 对应四种棋盘操作。 我们先判断传进来作为 key 的 `direction` 操作是否存在 `move` 字典中。如果存在的话，我们再用 `move_is_possible` 方法判断这个操作是否能在棋盘执行。 这两个判断都通过后，就会对棋盘进行相应移动操作。 这里的难点在于理解矩阵转置和逆转后和原矩阵的关系。如果想不明白，可以在纸上画出变化前后的矩阵对比。

#### 判断输赢

```python
def is_win(self):
    # 任意一个位置的数大于设定的 win 值时，游戏胜利
    return any(any(i >= self.win_value for i in row) for row in self.field)

def is_gameover(self):
    # 无法移动和合并时，游戏失败
    return not any(self.move_is_possible(move) for move in actions)


```

在 `is_win` 函数方法中，我们使用了 Python 内置的 any 函数，any 接收一个可迭代对象作为参数(iterable),返回 bool 值。 这里的 any 里面嵌套了另一个 any，里层的 any 传入了每一行的元素并依次比较这一行的每个元素与 `self.win_value` 的大小，如果有任何一个元素大于 `self.win_value`，就返回 `True`,否则返回 `False`；外层的 any 传入的是矩阵每一行元素在内层 any 里处理后返回的 bool 值，如果有任何一个 bool 值为 `True`，外层的 any 就返回 `True`。

`is_gameover` 函数用来判断游戏是否结束。当上下左右四个方向都不能移动时，游戏结束。

#### 判断能否移动

```python
def move_is_possible(self, direction):
    '''传入要移动的方向
    判断能否向这个方向移动
    '''
    def row_is_left_movable(row):
        '''判断一行里面能否有元素进行左移动或合并
        '''
        def change(i):
            # 当左边有空位（0），右边有数字时，可以向左移动
            if row[i] == 0 and row[i + 1] != 0:
                return True
            # 当左边有一个数和右边的数相等时，可以向左合并
            if row[i] != 0 and row[i + 1] == row[i]:
                return True
            return False
        return any(change(i) for i in range(len(row) - 1))

    # 检查能否移动（合并也可以看作是在移动）
    check = {}
    # 判断矩阵每一行有没有可以左移动的元素
    check['Left']  = lambda field: any(row_is_left_movable(row) for row in field)
    # 判断矩阵每一行有没有可以右移动的元素。这里只用进行判断，所以矩阵变换之后，不用再变换复原
    check['Right'] = lambda field: check['Left'](invert(field))

    check['Up']    = lambda field: check['Left'](transpose(field))

    check['Down']  = lambda field: check['Right'](transpose(field))

    # 如果 direction 是“左右上下”即字典 check 中存在的操作，那就执行它对应的函数
    if direction in check:
        # 传入矩阵，执行对应函数
        return check[direction](self.field)
    else:
        return False


```

在 `move_is_possible` 函数中，我们只用实现判断能否向左移动的代码，然后同样利用矩阵的转置和逆转来转换矩阵，完成能否向其他方向移动的判断。

### 绘制游戏界面

（注：这一步是在棋盘类内定义的）

```python
def draw(self, screen):
    help_string1 = '(W)Up (S)Down (A)Left (D)Right'
    help_string2 = '     (R)Restart (Q)Exit'
    gameover_string = '           GAME OVER'
    win_string = '          YOU WIN!'

    # 绘制函数
    def cast(string):
        # addstr() 方法将传入的内容展示到终端
        screen.addstr(string + '\n')

    # 绘制水平分割线的函数
    def draw_hor_separator():
        line = '+' + ('+------' * self.width + '+')[1:]
        cast(line)

    # 绘制竖直分割线的函数
    def draw_row(row):
        cast(''.join('|{: ^5} '.format(num) if num > 0 else '|      ' for num in row) + '|')

    # 清空屏幕
    screen.clear()
    # 绘制分数和最高分
    cast('SCORE: ' + str(self.score))
    if 0 != self.highscore:
        cast('HIGHSCORE: ' + str(self.highscore))

    # 绘制行列边框分割线
    for row in self.field:
        draw_hor_separator()
        draw_row(row)
    draw_hor_separator()

    # 绘制提示文字
    if self.is_win():
        cast(win_string)
    else:
        if self.is_gameover():
            cast(gameover_string)
        else:
            cast(help_string1)
    cast(help_string2)
```

这部分代码的关键在于 `cast` 函数。在 `draw` 函数传入的 `screen` 参数表示绘画的窗体对象，这里我们先记住 `screen.addstr()` 的作用是绘制字符，`screen.clear()` 的作用是清空屏幕，达到刷新的目的。在下一部分主逻辑后面，我们再结合两部分内容来理解 curses 库的用法。

### 完成主逻辑

完成以上工作后，我们就可以补完主逻辑了！

```python
def main(stdscr):
    def init():
        # 重置游戏棋盘
        game_field.reset()
        return 'Game'

    def not_game(state):
        # 根据状态画出游戏的界面
        game_field.draw(stdscr)
        # 读取用户输入得到 action，判断是重启游戏还是结束游戏
        action = get_user_action(stdscr)
        # 如果没有 'Restart' 和 'Exit' 的 action，将一直保持现有状态
        responses = defaultdict(lambda: state)
        responses['Restart'], responses['Exit'] = 'Init', 'Exit'
        return responses[action]

    def game():
        # 根据状态画出游戏的界面
        game_field.draw(stdscr)
        # 读取用户输入得到 action
        action = get_user_action(stdscr)

        if action == 'Restart':
            return 'Init'
        if action == 'Exit':
            return 'Exit'
        if game_field.move(action):  # move successful
            if game_field.is_win():
                return 'Win'
            if game_field.is_gameover():
                return 'Gameover'
        return 'Game'


    state_actions = {
            'Init': init,
            'Win': lambda: not_game('Win'),
            'Gameover': lambda: not_game('Gameover'),
            'Game': game
        }
    # 使用颜色配置默认值
    curses.use_default_colors()

    # 实例化游戏界面对象并设置游戏获胜条件为 2048
    game_field = GameField(win=2048)


    state = 'Init'

    # 状态机开始循环
    while state != 'Exit':
        state = state_actions[state]()

curses.wrapper(main)
```

这里的主要内容在实验的开始就分析过了。 所以我们来结合上一部分出现的 `screen.addstr()` 和 `screen.clear()` 理解 curses 库的用法。

首先， `curses.wrapper` 函数会激活并初始化终端进入 'curses 模式'。 在这个模式下会禁止输入的字符显示在终端上、禁止终端程序的行缓冲（line buffering），即字符在输入时就可以使用，不需要遇到换行符或回车。

接着，`curses.wrapper` 函数需要传一个函数作为参数，这个传进去的函数必须满足第一个参数为主窗体（main window） `stdscr`。 在前面的代码里，可以看到我们给 `curses.wrapper(main)` 的 `main` 函数中传入了一个 `stdscr`。

最后，`stdscr` 作为 `window.addstr(str)`、`window.clear()` 方法的调用需要窗体对象（window object），在 `game_field.draw(stdscr)` 中传入 `draw` 方法中。

### 运行

前面顺顺利利，偏偏到运行这一步出了问题（好像前面也不太可能出问题，都是写代码）。查了一下百度，好像是因为curses库只支持linux。然后去下载了一个支持win的第三方版本，最后成功运行了！

![2.8-1](https://doc.shiyanlou.com/document-uid600404labid1172timestamp1528193084353.png)

（其实并没有完美运行，某些操作会导致程序报错）

## 面向对象重构

### Action类

体现面向对象的编程方法，实现的`Action`类可以对于每个窗体实现操作。

```python
class Action(object):
    UP = 'up'
    LEFT = 'left'
    DOWN = 'down'
    RIGHT = 'right'
    RESTART = 'restart'
    EXIT = 'exit'

    actions = [UP, LEFT, DOWN, RIGHT, RESTART, EXIT]
    letter_codes = [ord(ch) for ch in 'WASDRQwasdrq']
    actions_dict = dict(zip(letter_codes, actions))

    def init(self, stdscr):
        self.stdscr = stdscr

    def get(self):
        char = "N"
        while char not in self.actions_dict:
            char = self.stdscr.getch()
        return self.actions_dict[char]
```

### Grid类

`Grid`类包含所有对于格子计算的操作，包括上下左右移动和重新开始。

#### reset

将整个棋盘重置，变成空棋盘后加入两个随机方块。

```python
# 重新开始和清零
def reset(self):
    self.cells = [[0 for i in range(self.size)] for j in range(self.size)]
    self.add_random_item()
    self.add_random_item()
```

#### add_random_item

添加随机方块，可能为2或4

```python
# 每次操作加入随机两个方块，可能是2 或4
def add_random_item(self):
    empty_cells = [(i, j) for i in range(self.size) for j in range(self.size) if self.cells[i][j] == 0]
    (i, j) = random.choice(empty_cells)
    self.cells[i][j] = 4 if random.randrange(100) >= 90 else 2
```

#### transpose

```python
# 矩阵转置
    def transpose(self):
        self.cells = [list(row) for row in zip(*self.cells)]
```

#### invert

```python
# 矩阵翻转
    def invert(self):
        self.cells = [row[::-1] for row in self.cells]
```

#### move_row_left

将矩阵向左划，计算方块的数值

##### tighten

矩阵向左收紧

```python
# 将矩阵向左收缩
def tighten(row):
    new_row = [i for i in row if i != 0]
    new_row += [0 for i in range(len(row) - len(new_row))]
    return new_row
```

##### merge

将相邻的两个数值相同的格子合并

```python
# 将相邻的两个数值相同的方格合并
def merge(row):
    pair = False
    new_row = []
    for i in range(len(row)):
        if pair:
            new_row.append(2 * row[i])
            #self.score += 2 * row[i]
            pair = False
        else:
            if i + 1 < len(row) and row[i] == row[i + 1]:
                pair = True
                new_row.append(0)
            else:
        new_row.append(row[i])
        assert len(new_row) == len(row)
        return new_row
```

返回

```python
# 先向左收缩然后合并然后再向左收缩完成一次操作
    return tighten(merge(tighten(row)))
```

#### move_left

```python
# 向左划
def move_left(self):
    self.cells = [self.move_row_left(row) for row in self.cells]
```

#### move_right

```python
# 向右划
def move_right(self):
    self.invert()
    self.move_left()
    self.invert()
```

#### move_up

````python
# 向上划
def move_up(self):
    self.transpose()
    self.move_left()
    self.transpose()
````

#### move_down

````python
# 向下划
def move_down(self):
    self.transpose()
    self.move_right()
    self.transpose()
````

#### row_can_move_left

判断能不能向左移动

```python
# 判断能否向左划
@staticmethod
def row_can_move_left(row):
    def change(i):
        if row[i] == 0 and row[i + 1] != 0:
            return True
        if row[i] != 0 and row[i + 1] == row[i]:
            return True
        return False

    return any(change(i) for i in range(len(row) - 1))
```

#### can_move_left

```python
def can_move_left(self):
    return any(self.row_can_move_left(row) for row in self.cells)
```

#### can_move_right

```python
    def can_move_right(self):
        self.invert()
        can = self.can_move_left()
        self.invert()
        return can
```

#### can_move_up

```python
def can_move_up(self):
    self.transpose();
    can = self.can_move_left()
    self.transpose()
    return can
```

#### can_move_down

```python
def can_move_down(self):
    self.transpose()
    can = self.can_move_right()
    self.transpose()
    return can
```

所有代码：

```python
class Grid(object):

    # 初始化函数
    def __init__(self, size):
        self.size = size
        self.cells = None
        self.reset()

    # 重新开始和清零
    def reset(self):
        self.cells = [[0 for i in range(self.size)] for j in range(self.size)]
        self.add_random_item()
        self.add_random_item()

    # 每次操作加入随机两个方块，可能是2 或4
    def add_random_item(self):
        empty_cells = [(i, j) for i in range(self.size) for j in range(self.size) if self.cells[i][j] == 0]
        (i, j) = random.choice(empty_cells)
        self.cells[i][j] = 4 if random.randrange(100) >= 90 else 2

    # 矩阵转置
    def transpose(self):
        self.cells = [list(row) for row in zip(*self.cells)]

    # 矩阵翻转
    def invert(self):
        self.cells = [row[::-1] for row in self.cells]

    # 向左划
    @staticmethod
    def move_row_left(row):
        # 将矩阵向左收缩
        def tighten(row):
            new_row = [i for i in row if i != 0]
            new_row += [0 for i in range(len(row) - len(new_row))]
            return new_row
        
        # 将相邻的两个数值相同的方格合并
        def merge(row):
            pair = False
            new_row = []
            for i in range(len(row)):
                if pair:
                    new_row.append(2 * row[i])
                    #self.score += 2 * row[i]
                    pair = False
                else:
                    if i + 1 < len(row) and row[i] == row[i + 1]:
                        pair = True
                        new_row.append(0)
                    else:
                        new_row.append(row[i])
            assert len(new_row) == len(row)
            return new_row
        # 先向左收缩然后合并然后再向左收缩完成一次操作
        return tighten(merge(tighten(row)))

    # 向左划
    def move_left(self):
        self.cells = [self.move_row_left(row) for row in self.cells]
    
    # 向右划
    def move_right(self):
        self.invert()
        self.move_left()
        self.invert()

    # 向上划
    def move_up(self):
        self.transpose()
        self.move_left()
        self.transpose()

    # 向下划
    def move_down(self):
        self.transpose()
        self.move_right()
        self.transpose()

    # 判断能否向左划
    @staticmethod
    def row_can_move_left(row):
        def change(i):
            if row[i] == 0 and row[i + 1] != 0:
                return True
            if row[i] != 0 and row[i + 1] == row[i]:
                return True
            return False

        return any(change(i) for i in range(len(row) - 1))

    def can_move_left(self):
        return any(self.row_can_move_left(row) for row in self.cells)

    def can_move_right(self):
        self.invert()
        can = self.can_move_left()
        self.invert()
        return can

    def can_move_up(self):
        self.transpose();
        can = self.can_move_left()
        self.transpose()
        return can

    def can_move_down(self):
        self.transpose()
        can = self.can_move_right()
        self.transpose()
        return can
```

### Screen类

`Screen`类用来绘制游戏界面，包括棋盘和方块数值，以及分数。

*提示文字*

```python
help_string1 = '(W)up (S)down (A)left (D)right'
help_string2 = '     (R)Restart (Q)Exit'
over_string = '           GAME OVER'
win_string = '          YOU WIN!'
```

#### cast

```python
def cast(self, string):
    self.screen.addstr(string + '\n')
```

#### draw_row

画格子的竖线

```python
def draw_row(self, row):
    self.cast(''.join('|{: ^5}'.format(num) if num > 0 else '|     ' for num in row) + '|')
```

#### draw

画格子的横线和文字数字

````python
def draw(self):
    self.screen.clear()
    self.cast('SCORE: ' + str(self.score))
    for row in self.grid.cells:
        self.cast('+-----' * self.grid.size + '+')
        self.draw_row(row)
        self.cast('+-----' * self.grid.size + '+')

        if self.win:
            self.cast(self.win_string)
        else:
            if self.over:
                self.cast(self.over_string)
            else:
                self.cast(self.help_string1)
    self.cast(self.help_string2)
````

所有代码：

```python
class Screen(object):
    help_string1 = '(W)up (S)down (A)left (D)right'
    help_string2 = '     (R)Restart (Q)Exit'
    over_string = '           GAME OVER'
    win_string = '          YOU WIN!'

    def __init__(self, screen=None, grid=None, score=0, best_score=0, over=False, win=False):
        self.grid = grid
        self.score = score
        self.over = over
        self.win = win
        self.screen = screen
        self.counter = 0

    def cast(self, string):
        self.screen.addstr(string + '\n')

    def draw_row(self, row):
        self.cast(''.join('|{: ^5}'.format(num) if num > 0 else '|     ' for num in row) + '|')

    def draw(self):
        self.screen.clear()
        self.cast('SCORE: ' + str(self.score))
        for row in self.grid.cells:
            self.cast('+-----' * self.grid.size + '+')
            self.draw_row(row)
        self.cast('+-----' * self.grid.size + '+')

        if self.win:
            self.cast(self.win_string)
        else:
            if self.over:
                self.cast(self.over_string)
            else:
                self.cast(self.help_string1)

        self.cast(self.help_string2)
```

### GameManager类

运行游戏的主逻辑类，包括游戏运行的流程控制状态机。

#### reset

重置游戏，全部重新开始，将所有数值全部回归初始状态。

```python
def reset(self):
    self.state = 'init'
    self.win = False
    self.over = False
    self.score = 0
    self.grid = Grid(self.size)
    self.grid.reset()
```

#### screen

显示游戏画面，刷新画面

```python
@property
    def screen(self):
        return Screen(screen=self.stdscr, score=self.score, grid=self.grid, win=self.win, over=self.over)
```

#### move

操作函数，获取action判断能否移动，如果能就执行移动。

```python
def move(self, direction):
    if self.can_move(direction):
        getattr(self.grid, 'move_' + direction)()
        self.grid.add_random_item()
        return True
    else:
        return False
```

#### is_win

游戏获胜条件，判断游戏是否获胜（这里是有一个格子达到2048就算获胜），获胜则结束游戏。

```python
@property
def is_win(self):
    self.win = max(chain(*self.grid.cells)) >= self.win_num
    return self.win
```

#### is_over

游戏失败函数，如果没有可以移动的方向则游戏失败。

```python
@property
def is_over(self):
    self.over = not any(self.can_move(move) for move in self.action.actions)
    return self.over
```

#### can_move

判断是否可以移动函数，参数为一个方向，返回一个布尔值。

```python
def can_move(self, direction):
    return getattr(self.grid, 'can_move_' + direction)()
```

#### state_init

状态重置

```python
def state_init(self):
    self.reset()
    return 'game'
```

#### state_game

游戏状态机，控制游戏的重启和结束以及操作。

```python
def state_game(self):
    self.screen.draw()
    action = self.action.get()

    if action == Action.RESTART:
        return 'init'
    if action == Action.EXIT:
        return 'exit'
    if self.move(action):
        if self.is_win:
            return 'win'
        if self.is_over:
            return 'over'
    return 'game'
```

#### _restart_or_exit

```python
def _restart_or_exit(self):
    self.screen.draw()
    return 'init' if self.action.get() == Action.RESTART else 'exit'
```

#### state_win

````python
    def state_win(self):
        return self._restart_or_exit()
````

#### state_over

````python
def state_over(self):
    return self._restart_or_exit()
````

#### \_\_call\_\_

````python
def __call__(self, stdscr):
    curses.use_default_colors()
    self.stdscr = stdscr
    self.action = Action(self.stdscr)
    while self.state != 'exit':
        self.state = getattr(self, 'state_' + self.state)()
````

