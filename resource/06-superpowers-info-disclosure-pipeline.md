# Superpowers 流程中的信息披露机制：Agent 如何通过反问将个人共识"挤"出来

> 一个工程师脑子里有完整的方案，但说出来的只有"帮我加个批量查询"。这不是工程师的问题——人脑里的信息本来就是高度压缩的，能说出来的是冰山一角。Superpowers（obra/superpowers）的工作流，本质上是一个**结构化信息萃取器**——它通过一套精心设计的追问流程，把工程师脑子里那些"知道但说不清"的信息，逐步转化为 AI 可以直接消费的显式规范。

---

## 一、问题的本质：信息不对称在协作中如何产生

### 1.1 共识四层模型与天然的信息缺口

在 AI 协作中，信息不对称的根本原因是：人类大脑里的信息经历了一个从"潜意识"到"团队共识"的漫长旅程，而 AI 只能在"团队共识"这一层消费信息。

```text
潜意识 ─→ 个人模糊掌握 ─→ 个人充分掌握 ─→ 团队共识
  ↑           ↑              ↑              ↑
连提出者     单人懂但表达    单人想清楚      写进 PRD/文档
自己都说不清  不清            但没说出口      AI 可读取
```

**Superpowers 流程的核心价值**：它是从"个人充分掌握"到"团队共识"这一段的信息萃取器。它不指望工程师一开始就把需求写清楚——它用一套流程化的追问，逐步把需求"挤"出来。

### 1.2 传统协作模式的信息损耗

在传统的"工程师给 AI 派活"模式下，信息流转是这样的：

```text
工程师脑中的完整方案（100%）
    ↓ 话语表述损耗（-40%）
说出来的指令（60%）
    ↓ AI 的自主脑补（+?%，方向可能错）
AI 理解的需求（60% + 脑补噪音）
    ↓ 实现偏差
最终产出
```

**Superpowers 做的事**：在"工程师说出指令"和"AI 开始实现"之间，插入一个**结构化追问层**，把信息损耗从 40% 降到接近 0%。

```text
工程师脑中的完整方案（100%）
    ↓ 第一轮表述
初始想法（60%）
    ↓ brainstorming: 逐层追问 + 上下文探索 + 方案对比
逐步完善的方案（95%+）
    ↓ writing-plans: 拆解为自包含的微任务
可执行计划（100%，无歧义、无占位符）
    ↓ 每一步信息自包含
AI 实现（准确度显著提升）
```

---

## 二、Superpowers 的信息披露流水线

Superpowers 不是一个"帮你写代码"的工具，而是一个**信息加工生产线**。每一个阶段都在对信息做不同形式的萃取和精炼。

### 2.1 阶段全景：六步信息精炼

```
brainstorming     →  探索 + 追问 → 萃取个人共识 → design spec
writing-plans     →  拆解 + 自检 → 消除所有歧义 → implementation plan
git-worktrees     →  隔离           → 信息不交叉   → 独立 workspace
subagent-driven   →  按需注入       → 精准投喂     → 每个 agent 只看自己的那部分
two-stage review  →  验证对齐       → 产出 = 需求   → spec review + code quality review
verification      →  证据校验       → 不靠嘴说     → 跑完才算
```

### 2.2 阶段一：brainstorming —— 用追问把"个人共识"萃取出

这是整个流程中最关键的信息披露环节。Superpowers 的 brainstorming 不是那种"你把需求告诉我，我给你写方案"的单向接收——它是一个**结构化的萃取过程**。

#### 追问机制的设计逻辑

brainstorming 的 Checklist 定义了 9 个必须按序完成的步骤。其中与信息披露直接相关的是前 4 步：

| 步骤 | 动作 | 信息披露功能 |
|------|------|-------------|
| 1. Explore project context | 检查文件、文档、近期提交 | **拉取已有团队共识**——项目里已经有了什么约定？哪些文件已经定义了边界？ |
| 2. Ask clarifying questions | 一次只问一个问题，优先多选 | **萃取个人共识**——工程师脑子里知道但没说的约束、偏好、成功标准 |
| 3. Propose 2-3 approaches | 每种方案附带取舍和推荐理由 | **迫使显式选择**——"你觉得哪种更好"这个选择本身就是在让工程师把自己的隐性判断显式化 |
| 4. Present design in sections | 逐段展示，逐段确认 | **增量信息披露验证**——不是最后一次性确认，而是每段都确认，每次确认都是一次修正机会 |

#### 一次只问一个问题：背后的信息论原理

Superpowers 的 brainstorming 有一个硬规定：**每次只问一个问题**。

这不是用户体验优化——这是信息披露效率优化的核心手段。原因有三：

1. **问题聚焦 = 回答质量高**。一次被问 5 个问题，人倾向于只回答最后两个或最明显的两个，前面几个被略过。而这些被略过的往往是最关键的约束条件。
2. **每次回答都是一次"信息提交"**。一个问题 → 一个回答 → 一个确认，这个循环本身就是把模糊信息逐步固化的过程。每个回答都在收缩"信息不确定性的范围"。
3. **追问链自然引导深度思考**。第一个问题暴露了模糊点 → 根据回答追问下一个 → 再暴露下一个模糊点。这种链式追问比"一次性提问清单"更有可能触及工程师自己都没意识到的隐性假设。

例子：一个"做个用户管理页面"的需求，brainstorming 的实际展开可能是：

```
Agent Q1: "这个用户管理页面主要是做增删改查，还是包含更复杂的权限管理？"
  → 现在才知道还涉及角色分配

Agent Q2: "用户角色是固定的几种（管理员、普通用户），还是支持自定义角色？"
  → 现在才知道只支持 3 种固定角色

Agent Q3: "权限粒度是页面级的（能看到用户管理就能操作所有），还是操作级的（查看和编辑分开控制）？"
  → 现在才知道需要操作级权限

Agent Q4: "和已有的认证系统（JWT）的关系是什么？是复用现有 token，还是需要扩展 claims？"
  → ...
```

每一步追问都在缩小"AI 不知道但工程师知道"的信息差距。最后产出的设计 spec 不再是"做个用户管理页面"，而是包含了权限模型、角色定义、与现有系统的集成方式、API 设计等等。

#### 方案对比：迫使隐性偏好显式化

brainstorming 第三步是"提出 2-3 种方案，附带取舍和推荐"。这看起来是帮工程师做选择，实际上是**信息披露的陷阱**——它迫使工程师说出自己的隐性偏好。

当 Agent 列出 3 种方案并说"我推荐方案 B，因为 XXX"，工程师的反应可能是：

- "对，就选 B" → 确认隐性偏好和 Agent 的判断一致
- "不，选 A，因为 YYY" → 工程师说出了一个之前没说过的约束（"YYY"），这个约束现在被显式化了
- "都不对，应该是 ZZZ" → 工程师描述了一个全新的方案，这是最深层次的信息披露

无论哪种反应，都产出了新的信息。

#### 设计 spec：个人共识 → 团队共识的物化

brainstorming 的最后一步是把确认后的设计写入 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`。这一步的意义：

- 之前确认的所有信息，从"对话中的口头共识"变成了"文件中的持久共识"
- 后续所有流程（writing-plans、subagent-driven-development）都从这份 spec 开始，不再需要重新确认
- Spec 自审（placeholder scan、internal consistency、scope check、ambiguity check）是**信息完整性校验**——确保萃取出来的信息没有矛盾、没有遗漏

### 2.3 阶段二：writing-plans —— 消除最后的信息歧义

从 spec 到 plan，不是"把大任务拆成小任务"这么简单。writing-plans 的核心原则揭示了它的信息精炼功能：

**"Assume the engineer has zero context for our codebase and questionable taste."**

这句话的意思是：**每一个微任务必须是信息自包含的**。执行这个任务的 agent 不应该需要知道"这个函数是做什么的"——它应该在 plan 里被明确定义。不应该需要知道"怎么测试"——测试代码应该在 plan 里被完整给出。

writing-plans 的"No Placeholders"规则就是信息精炼的最后一刀：

| 禁止写法 | 问题 | 正确写法 |
|---------|------|---------|
| "TBD" / "TODO" | 信息缺口未关闭 | 补齐后再写 plan |
| "Add appropriate error handling" | 模糊，agent 不知道"appropriate"是什么 | 写出具体的错误类型和处理方式 |
| "Write tests for the above" | agent 不知道测什么 | 写出完整的测试用例代码 |
| "Similar to Task N" | 要求 agent 去读另一个 task 的信息 | 重复代码，保持信息自包含 |

**信息自包含**是 Superpowers 实现 agent 独立执行的关键——不依赖上下文、不依赖"常识"、不依赖"参考前面的 task"。

### 2.4 阶段三：git-worktrees —— 物理层面的信息隔离

Git worktree 不直接参与信息的萃取或精炼，但它提供了一个物理基础：**每个任务一张干净桌子**。

从信息披露角度看，worktree 的作用是：

- **防止"当前数据"层的信息交叉污染**。如果 agent A 在做 Task 3，agent B 在做 Task 5，它们共用一个工作目录，A 的中间状态会污染 B 的文件视图。
- **每个 agent 只看到"它需要看到的文件 + 它自己的改动"**——这正是信息披露的"精准投喂"在文件系统层面的实现。

### 2.5 阶段四：subagent-driven-development —— 精准信息投喂

这是信息披露在"执行层"的集中体现。Superpowers 的 subagent-driven-development 有两个核心原则：

#### 原则一：每个 subagent 拿到的是"精选信息包"，不是"全量上下文"

```
Task("Implement Task N: [task name]")
  prompt: |
    ## Task Description
    [FULL TEXT of task from plan — paste directly, don't make subagent read the file]

    ## Context
    [Scene-setting: where this fits, dependencies, architectural context]

    ## Before You Begin
    If you have questions, ask them now.
```

注意：subagent 不继承父会话的上下文和历史。它只拿到三样东西：
1. **Task 的完整文本**（已包含所有该 task 需要的信息，因为在 writing-plans 阶段就被自包含化了）
2. **场景设定**（告诉它"你现在在哪"，但不告诉它"之前发生了什么"）
3. **提问许可**（它可以在遇到模糊点时追问）

这种"精准投喂"的好处：
- **上下文窗口不被污染**——无关的 task 信息、之前的讨论、旧会话历史统统不进入 subagent 的上下文
- **信息密度最大化**——subagent 看到的所有内容都与当前 task 直接相关
- **减少信息过载带来的判断错误**——如果 subagent 看到了全套 spec，它可能"顺手"实现不属于自己 task 范围的功能

#### 原则二：subagent 自己也有追问能力

Subagent 不是"拿到指令就闷头干"。implementer-prompt 明确要求：

> "If you have questions about the requirements or acceptance criteria, the approach or implementation strategy, dependencies or assumptions, or anything unclear in the task description — **ask them now.** Raise any concerns before starting work."

这是信息披露链上的**二次追问点**。在 brainstorming 阶段，主 agent 追问工程师，萃取出 spec；在 writing-plans 阶段，spec 被精炼为 plan；在执行阶段，如果 plan 里仍有不到位的地方（某个依赖没说清楚、某个边界条件被忽略了），subagent 会再次追问。

而且，subagent 的 4 种状态里有 `NEEDS_CONTEXT`——它可以在执行中因信息缺失而暂停，等待补充信息：

| 状态 | 含义 | 信息披露意义 |
|------|------|-------------|
| DONE | 任务完成，信息充分 | plan 信息完整 |
| DONE_WITH_CONCERNS | 完成了但有疑虑 | subagent 发现了 plan 没覆盖到的边界 |
| NEEDS_CONTEXT | 需要更多信息 | plan 存在信息缺口，需要补充 |
| BLOCKED | 无法完成 | plan 有根本性缺陷，需要返工 |

### 2.6 阶段五：两阶段 review —— 信息完整性和一致性的校验

Subagent 完成任务后，不是直接合并，而是经过两道 review：

**第一道：Spec Compliance Review（需求对齐校验）**

Spec reviewer 被明确告知：**不要相信 implementer 的报告**。它要自己读代码，逐条对照 spec 里的要求：

- 缺了什么？（missing requirements）
- 多做了什么？（extra/unneeded work）
- 理解对了吗？（misunderstandings）

这一道 review 的本质是**信息披露的闭合校验**——"通过 brainstorming 萃取出的需求（spec），和实施后产出的代码，是否严格对齐？"

如果 spec reviewer 说"不对齐"，implementer 必须修复，然后再次 review，直到对齐为止。这是一个闭环。

**第二道：Code Quality Review（代码质量校验）**

在 spec 对齐确认后，才进入代码质量 review。这不是信息披露的范畴，而是实现质量的范畴——但它同样建立在"信息准确"的前提下。如果 spec 都没对齐，讨论代码质量没有意义。

### 2.7 阶段六：verification-before-completion —— 信息披露的最终守门人

这是 Superpowers 中最"硬"的一条规则：

```text
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

在没有跑验证命令、没有看到输出、没有确认输出符合预期之前，**不能说"完成了"**。

从信息披露的角度，这条规则的深层意义是：**信息披露的最终验证，是执行结果的客观证据**。你说"做完了"、"应该能跑"、"看着没问题"——这些都是口头共识，不是验证过的共识。只有跑完命令，看到输出，才是从"个人认为完成了"到"可验证的完成"的最后一步。

---

## 三、Superpowers 信息披露机制的完整链路

把上面的六个阶段串起来，Superpowers 的信息披露机制可以总结为一条完整的管道：

```text
[工程师的隐性知识]
    │
    ▼
[brainstorming: 逐层追问]
    萃取场景：一次只问一个问题
    萃取产物：每步确认后的设计 spec
    信息形态变化：个人模糊掌握 → 个人充分掌握 → 文档化的团队共识
    │
    ▼
[writing-plans: 消除歧义]
    精炼场景：自包含微任务 + 无占位符
    精炼产物：每个 task 包含完整代码、测试、命令
    信息形态变化：团队共识 spec → 可独立执行的信息单元
    │
    ▼
[git-worktrees: 物理隔离]
    隔离场景：每任务独立目录
    隔离产物：agent 只看到"该看到的"
    信息形态变化：全量仓库视图 → 精准透视图
    │
    ▼
[subagent-driven: 精准投喂]
    投喂场景：只给 task 描述 + scene-setting
    投喂产物：聚焦的 agent 上下文，不含无关信息
    信息形态变化：全部信息 → 任务相关子集
    │
    ▼
[two-stage review: 闭合校验]
    校验场景：spec reviewer 逐行对照 + code quality reviewer
    校验产物：缺失信息补回 → 再次 review 直到闭合
    信息形态变化：可能不对齐的实现 → 严格对齐的实现
    │
    ▼
[verification-before-completion: 证据校验]
    证据场景：跑命令，看输出
    证据产物：验证通过的客观证据
    信息形态变化：声称完成 → 证明完成
    │
    ▼
[团队共识（代码 + 测试 + 文档）]
```

---

## 四、与现有文档族中"核心心法"的映射

Superpowers 的信息披露机制，与 `docs/candidate/` 中已梳理的三个核心主题形成精确的对应：

### 4.1 与信息分层模型的对应

| 信息分层模型（01 文档） | Superpowers 的对应环节 | 怎么做到的 |
|------------------------|----------------------|----------|
| 世界知识（AI 自带） | 不涉及 | AI 已满，不需要补 |
| 团队共识（需补齐） | brainstorming step 1 "Explore project context" + 最终写入 design spec | 拉取已有，补入新的 |
| 当前需求（需补齐） | brainstorming step 2-4 "追问 + 方案对比 + 分段确认" | 通过追问把个人共识转化为当前需求的显式描述 |

### 4.2 与信息披露本质的对应

| 信息披露本质（02 文档） | Superpowers 的对应环节 | 怎么做到的 |
|------------------------|----------------------|----------|
| 共识四层光谱 | brainstorming 的追问链 | 每一步追问都是一次"光谱右移"——从模糊到清晰 |
| 抽象到具体的距离 | brainstorming 的逐段确认 + writing-plans 的无占位符 | 逐步逼近到"你家那只金毛"级别的精确度 |
| 三条披露通道 | CLAUDE.md/AGENTS.md（长期约束）+ brainstorming spec（中期 spec）+ task description（当前需求） | 分别对应三层时效的信息披露 |

### 4.3 与上下文管理策略的对应

| 上下文管理（03 文档） | Superpowers 的对应环节 | 怎么做到的 |
|----------------------|----------------------|----------|
| 三种信息流入方式 | "主动塞"对应 task 注入、"工具按需取"对应 subagent 自己读文件 | 分层组合策略 |
| 反模式：一次性塞入所有信息 | subagent"不继承父会话上下文" | 只给需要的信息，不塞多余的 |
| 反模式：长会话混着做不同方向的事 | worktree 隔离 + 独立 subagent | 物理 + 逻辑双重隔离 |

---

## 五、Superpowers 机制对团队实践的启示

### 5.1 不只是"用工具"，是"设计信息流转"

Superpowers 的整套流程，本质上是一个**信息工程系统**。它的核心不是"让 AI 更聪明"，而是"让人脑里的信息以最高保真度流转到 AI 的上下文窗口里"。

对团队的启示：

- **不要只在"写更好的 prompt"上用力**。prompt 是信息传递的最后一步。前面缺的信息，prompt 写得再好也补不回来。
- **建立追问文化**。如果 AI 工具不会主动追问（不使用 Superpowers），工程师自己可以在指令结尾加一句："如果有任何模糊的地方，先追问再动手"。
- **追问比"一次性写清楚"高效**。人类不擅长一次性把脑中的所有信息完整表达出来。分步追问是更符合人类认知规律的信息披露方式。

### 5.2 信息自包含是 agent 可独立执行的物理基础

writing-plans 的"每个 task 信息自包含"原则，是一个可以独立于 Superpowers 使用的实践：

- 每个 task 包含**完整的**代码、测试、命令
- 不依赖"常识"、"参考前面的 task"、"你有上下文你知道"
- **No Placeholders**——任何省略都是 bug

这对应到文档族（05 文档）中的"新员工"类比：你不会跟新员工说"跟上次那个一样"——因为上次他没参与。每个 task 都应该像给第一天入职的人写的——虽然执行它的 agent 可能就是你，但它不依赖你"记得"任何东西。

### 5.3 review 不只是"检查代码"，是"检查信息对齐"

Superpowers 的两阶段 review 给了一个关于 review 的新视角：

- **Spec compliance review**：检查"实现产物"和"信息披露产物"是否对齐。如果不对齐，可能是实现出错，也可能是信息披露时理解出错。
- **Code quality review**：在确认对齐后，再检查实现质量。

这暗示了一个实践：在 code review 之前，先做一轮"spec review"——把原始需求（PRD/spec/task description）和实现产物放在一起对照。这是很多团队的 review 流程中缺失的一环。

---

## 六、总结

Superpowers 的信息披露机制可以浓缩为三句话：

1. **brainstorming 是"萃取器"**——用追问把工程师脑子里的隐性知识转化为显式的 spec，一次只问一个问题，每个问题都在收缩不确定性范围。

2. **writing-plans 是"精炼器"**——把 spec 中的信息消除掉所有歧义和占位符，变成每个 task 信息自包含、agent 不需要依赖常识和上下文就能独立执行。

3. **subagent + review + verification 是"闭环系统"**——实现过程中继续追问（NEEDS_CONTEXT）、完成后校验对齐（spec review）、最终用客观证据锁定（verification-before-completion）。

**一句话**：Superpowers 不是帮你写代码的，它是一个从人脑到 AI 的信息损耗最小的传递管道。
