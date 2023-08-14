(define (domain example_domain)
    (:requirements :strips)
    (:predicates (p1?x?y?z)  (p2?x?y))
    (:action action_1
        :parameters (?x ?y ?z )
        :precondition (and (p1 ?x ?y ?z) (not (p2 ?y ?z)))
        :effect (p2 ?y ?z)
    )
)
