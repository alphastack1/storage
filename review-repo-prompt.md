You are entering an unfamiliar codebase as a principal engineer, systems architect, product strategist, and agent-systems researcher.

Your job is not to merely review the code.

Your job is to reconstruct the system as completely as possible: what exists, why it exists, how it behaves, what it is trying to become, where it is succeeding or failing, and what the system could become if its current constraints were removed.

Treat the repository as evidence of a larger underlying system and intent.

Core Objective

Build a rigorous mental model of:

- every important file and directory
- every subsystem
- every execution path
- every major data flow
- every state transition
- every external dependency and integration
- every interface and abstraction boundary
- every background process
- every agent, worker, tool, queue, scheduler, or asynchronous component
- every important configuration mechanism
- every persistence layer
- every API and protocol
- every user-facing flow
- every internal workflow
- every major architectural decision
- every explicit goal
- every implicit goal
- every local optimization
- every system-level optimization
- every constraint
- every assumption
- every likely failure mode
- every place where implementation and intended behavior diverge

I want you to understand both:

1. The system that exists
2. The system that appears to be trying to exist

Then derive:

3. The system that should exist
4. The system that could exist under radically greater resources and ambition

---

PHASE 1 — Repository Reconstruction

Start by exploring the repository systematically.

Do not jump immediately to recommendations.

Construct a map of the codebase.

For each meaningful directory, subsystem, and important file, determine:

- its responsibility
- what invokes it
- what it invokes
- inputs
- outputs
- state it reads
- state it mutates
- external dependencies
- assumptions
- invariants
- failure modes
- whether it appears complete, partial, experimental, obsolete, duplicated, or abandoned
- its relationship to the larger system

Trace important flows end-to-end, not just file-by-file.

Examples:

- user action → frontend → API → orchestration → worker → database → response
- event → queue → consumer → side effect
- agent request → planning → tool use → sub-agent → evaluation → persistence → output
- scheduled process → execution → retry → failure handling
- authentication → authorization → resource access
- creation → mutation → synchronization → deletion

Where useful, create dependency graphs and execution graphs mentally before drawing conclusions.

---

PHASE 2 — Build Multiple Models of the System

Do not rely on a single architectural description.

Construct at least these models:

A. Structural Model

What components exist, and how are they connected?

B. Runtime Model

What actually happens while the system is running?

What processes exist?

What talks to what?

What is synchronous versus asynchronous?

Where does state live?

C. Data Model

What are the important entities?

How do they relate?

What is authoritative?

What is cached, derived, replicated, ephemeral, or persistent?

D. Control Model

What decides what happens next?

Where are decisions centralized?

Where are they distributed?

Where are there feedback loops?

E. Product Model

What user or business problem does each subsystem appear to solve?

What is the product actually optimizing for?

F. Intent Model

Infer what the builders appear to have intended, even where the implementation is incomplete.

Separate:

- explicit intent
- strongly inferred intent
- weakly inferred intent
- speculation

G. Failure Model

How can the system fail?

Consider:

- code failures
- architecture failures
- coordination failures
- stale state
- race conditions
- cascading failures
- retries
- partial completion
- deadlocks
- duplicated work
- silent failures
- bad incentives
- agent drift
- context loss
- incorrect assumptions
- observability gaps
- scaling limits
- human operational failures

H. Success Model

What does "success" appear to mean for this system?

Identify both explicit and implicit success criteria.

Then determine whether the current architecture is actually aligned with them.

---

PHASE 3 — Distinguish Fact From Inference

Maintain an internal evidence hierarchy.

For every important conclusion, classify it as one of:

- Observed — directly supported by code/config/docs
- Strong inference — highly likely from multiple pieces of evidence
- Weak inference — plausible but uncertain
- Unknown — cannot currently determine
- Contradiction — different parts of the repository imply incompatible things

Do not silently convert assumptions into facts.

Whenever implementation, documentation, naming, comments, tests, and runtime architecture disagree, call that out explicitly.

Contradictions are especially important.

---

PHASE 4 — Reconstruct the Goal Hierarchy

Infer the hierarchy of goals behind the repository.

Work from the bottom upward:

Level 1 — Local goals

What is each function/module trying to accomplish?

Level 2 — Subsystem goals

What capability is each subsystem providing?

Level 3 — Product goals

What user outcomes are being optimized?

Level 4 — System goals

What does the whole architecture appear designed to accomplish?

Level 5 — Strategic goal

Why does this system exist at all?

Then work downward again.

Ask:

«If the strategic goal is X, should the lower-level architecture actually look like this?»

Identify places where local implementation choices undermine the larger objective.

---

PHASE 5 — Predict Behavior

Do not stop at explaining the current implementation.

Model its likely behavior.

For important flows and subsystems, predict:

- what works reliably
- what works only under ideal conditions
- what degrades with scale
- what becomes brittle as complexity grows
- what will become operationally expensive
- what creates hidden coupling
- what will produce emergent behavior
- what will likely fail first
- what creates bottlenecks
- what creates compounding advantages
- which architectural bets are likely to succeed
- which are likely to fail
- which currently insignificant components may become strategically important

For each major prediction, explain the causal mechanism.

Do not say merely "this won't scale."

Explain why, where, under what load or organizational conditions, and what failure signature would appear first.

---

PHASE 6 — Reconstruct the Ideal System

After understanding the implementation, temporarily ignore it.

Start again from:

- the inferred mission
- desired user outcomes
- fundamental constraints
- unavoidable technical realities

Ask:

«If we were designing this system from first principles today, how should it work?»

Do not preserve existing abstractions merely because they already exist.

Determine:

- what should remain
- what should be deleted
- what should be merged
- what should be split
- what should become a platform primitive
- what should become declarative
- what should become event-driven
- what should become deterministic
- what should remain probabilistic
- what belongs in infrastructure
- what belongs in application logic
- what belongs in agents
- what absolutely should not be delegated to agents

Identify the smallest set of powerful primitives from which the larger system could be composed.

---

PHASE 7 — Agentic Architecture Analysis

Pay special attention to whether this system could benefit from agents, sub-agents, or autonomous coordination.

Do not assume more agents are automatically better.

Analyze:

- where autonomy adds leverage
- where autonomy adds unacceptable nondeterminism
- decomposition of work
- delegation
- specialization
- hierarchical agents
- peer agents
- supervisor agents
- planner/executor separation
- evaluator/critic agents
- tool-using agents
- background agents
- long-running agents
- event-driven agents
- memory
- context propagation
- shared state
- permissions
- task ownership
- agent identity
- handoffs
- retries
- checkpoints
- rollback
- consensus
- conflict resolution
- scheduling
- prioritization
- budgets
- termination conditions
- deadlock prevention
- duplicate-work prevention
- drift prevention
- observability
- auditability
- human intervention
- self-evaluation
- external evaluation

For every proposed agent, be able to answer:

«Why is this an agent rather than normal deterministic software?»

If that question cannot be answered convincingly, it probably should not be an agent.

---

PHASE 8 — Coordination and Keeping the System on Track

Assume we eventually operate many concurrent agents and sub-agents.

Design mechanisms that prevent the overall system from losing coherence.

Think deeply about:

- shared world models
- canonical state
- task graphs
- dependency graphs
- leases
- ownership
- priorities
- global goals
- local goals
- planning horizons
- context compression
- durable memory
- working memory
- event logs
- blackboards
- message buses
- capability registries
- tool registries
- provenance
- checkpoints
- budgets
- deadlines
- confidence
- uncertainty
- escalation
- arbitration
- reconciliation
- verification
- evaluation
- supervision
- recovery from partially completed work

Consider how the system knows:

- what has already happened
- what is currently happening
- what remains to be done
- who owns each task
- whether work is still relevant
- whether two agents are doing the same work
- whether the underlying world has changed
- whether the current plan is still valid
- whether a result is trustworthy
- when to stop

Treat coordination as a first-class distributed systems problem, not just prompt engineering.

---

PHASE 9 — The 100× Thought Experiment

Now remove ordinary constraints.

Assume we have approximately:

- 100× more compute
- 100× more model inference
- 100× more parallelism
- substantially larger context
- cheap background reasoning
- persistent agents
- rich observability
- extensive simulation
- large-scale evaluation infrastructure

Do not merely make the existing architecture 100× larger.

Ask:

«What architectural choices become possible that are fundamentally irrational under today's constraints?»

Explore ideas such as:

- thousands of specialized agents
- continuously maintained world models
- speculative execution
- parallel solution search
- competing plans
- evolutionary architectures
- continuous simulation
- synthetic users
- automated red teams
- continuous architecture review
- self-generated evaluations
- shadow execution
- multiple independent implementations
- agent markets
- dynamic team formation
- automated organizational structures
- real-time system optimization
- continual codebase understanding
- continuous refactoring proposals
- automated experiments
- automated causal analysis
- autonomous debugging
- autonomous product discovery
- large-scale counterfactual simulation

Push beyond obvious extensions.

Ask repeatedly:

«If inference were effectively abundant, what would we stop doing the old way?»

Then ask:

«What becomes the new bottleneck?»

Possible new bottlenecks might include:

- coordination
- truth
- verification
- latency
- state consistency
- authority
- trust
- evaluation
- user attention
- economic incentives
- physical-world constraints

Follow the consequences.

---

PHASE 10 — Unshackled Design

Go beyond incremental improvement.

Imagine we are not trying to improve this repository by 20%.

Imagine the repository is simply Version 0 of a much larger idea.

Explore:

- what this could become at 10× capability
- what it could become at 100× capability
- what it could become if redesigned without backward compatibility
- what entirely new product categories emerge
- what organizational work could disappear
- what new abstractions become possible
- what becomes autonomous
- what becomes continuously optimized
- what becomes invisible infrastructure

Distinguish clearly between:

- practical near-term changes
- ambitious but buildable changes
- speculative research directions
- genuinely paradigm-shifting possibilities

Do not constrain the analysis to today's conventional SaaS architecture.

---

CRITICAL STOPPING POINT — QUESTIONS BEFORE CONCLUSIONS

Do not provide the final architecture analysis or recommendations yet.

Once you believe you have explored enough of the repository to form a strong initial model, stop.

Before giving me your long-form conclusions, produce at least 30 high-value questions about anything that remains unclear, ambiguous, contradictory, underspecified, or dependent on founder/product intent.

Aim for 40–60 questions if the repository warrants it.

These must not be filler questions.

Prioritize questions whose answers could materially change your model of:

- the product
- intended users
- strategic vision
- architectural constraints
- expected scale
- latency requirements
- reliability requirements
- economic model
- agent behavior
- autonomy
- human oversight
- data ownership
- security model
- deployment model
- success metrics
- long-term direction
- tradeoffs deliberately accepted
- experiments versus production code
- abandoned approaches
- future plans

Organize the questions into categories such as:

1. Product and mission
2. User behavior
3. System architecture
4. Data and state
5. Agents and orchestration
6. Reliability and failure handling
7. Scale and performance
8. Security and permissions
9. Product economics
10. Historical decisions
11. Future vision
12. 100× ambition

For each question, where useful, briefly state:

Why I am asking: what ambiguity you observed and what different answers would imply.

Do not ask questions that can simply be answered by inspecting another file in the repository.

Exhaust the codebase first.

---

WAIT FOR MY ANSWERS

After presenting the questions:

STOP.

Do not yet produce the final report.

Wait for my responses.

My answers should become additional evidence alongside the repository itself.

If my answers contradict the implementation, preserve the contradiction rather than forcing them to agree.

---

FINAL PHASE — AFTER I ANSWER

Only after receiving my answers, produce the comprehensive report.

The final report should include at minimum:

1. Executive Model

A concise description of what this system fundamentally is.

2. Repository Map

Major components, responsibilities, and relationships.

3. Runtime Architecture

How the system actually behaves.

4. Major End-to-End Flows

The most important execution paths.

5. Data and State Model

Where truth lives and how it moves.

6. Goal Hierarchy

Local → subsystem → product → strategic goals.

7. Intended vs. Actual Architecture

Where implementation diverges from intent.

8. What Is Working

Architectural choices worth preserving.

9. What Is Not Working

Structural weaknesses and technical debt.

10. Hidden Risks

Problems likely to appear later.

11. Behavioral Predictions

What is likely to succeed, fail, or become a bottleneck.

For every major prediction include:

- evidence
- reasoning
- confidence
- conditions under which the prediction changes

12. First-Principles Architecture

How the system should work if redesigned around its actual mission.

13. Agent Architecture

Where agents belong and where deterministic systems should remain.

14. Multi-Agent Coordination Architecture

How agents coordinate without drift, duplication, incoherence, or runaway complexity.

15. 10× Architecture

What we would build with materially more resources.

16. 100× Architecture

What becomes possible with abundant intelligence and compute.

17. Unshackled Version

What this could become if we ignored the assumptions embedded in the current implementation.

18. Migration Path

How to get from current → ideal without destroying what already works.

Separate into:

- immediate
- next
- later
- research bets

19. Highest-Leverage Actions

Rank the changes by expected impact.

For each:

- impact
- cost
- risk
- reversibility
- prerequisite
- why now

20. Open Questions

What remains genuinely unknowable.

---

Analysis Standards

Throughout the entire process:

- Be skeptical.
- Be specific.
- Follow evidence.
- Trace causality.
- Do not confuse complexity with sophistication.
- Do not preserve abstractions out of politeness.
- Do not recommend agents merely because agents are fashionable.
- Do not assume comments or documentation are correct.
- Do not assume current code reflects current intent.
- Do not assume unfinished code is accidental.
- Look for historical layers in the architecture.
- Look for evidence of pivots.
- Look for duplicated mental models.
- Look for abstractions that leak.
- Look for accidental coupling.
- Look for missing primitives.
- Look for places where complexity is compensating for the wrong abstraction.
- Look for places where deterministic machinery would outperform intelligence.
- Look for places where intelligence changes the nature of the problem.

Most importantly:

Understand before optimizing.

Reconstruct intent before redesigning implementation.

Question assumptions before scaling them.

Optimize the whole system, not individual files.

And when thinking about the future:

Do not ask only how to make the current system better. Ask what system we would build if we knew everything we know now and were no longer constrained by the architecture we inherited.
