// ### COMPARISON ###

// :: type Ordering = -1 | 0 | 1

// :: type Eq a =
// ::   { equals : a -> a -> Boolean }

// :: type Ord a =
// ::   { compare : a -> a -> Ordering }

// ### DESTRUCTURING ###

// :: type Foldable f =
// ::   | { foldMap : Monoid m -> (a -> m) -> f a -> m }
// ::   | { foldr : (a -> b -> b) -> b -> f a -> b }
// ::   | { foldl : (b -> a -> b) -> b -> f a -> b }

// ### CATEGORY ###

// :: type Semigroupoid p =
// ::   { compose : p b c -> p a b -> p a c }

// :: type Category p =
// ::   & Semigroupoid p
// ::   & { id : p a a }

// ### INTERCATEGORY ###

// :: type Functor f =
// ::   { map : (a -> b) -> f a -> f b }

// :: type Apply f =
// ::   & Functor f
// ::   & (
// ::     | { ap    : f (a -> b) -> f a -> f b }
// ::     | { lift2 : (a -> b -> c) -> f a -> f b -> f c }
// ::     )

// :: type Pointed f =
// ::   { of : a -> f a }

// :: type Applicative f =
// ::   & Pointed f
// ::   & Apply f

// :: type Monad m =
// ::   & Applicative m
// ::   & (
// ::     | { join  : m (m a) -> m a }
// ::     | { chain : (a -> m b) -> m a -> m b }
// ::     )

// :: type Traversable t =
// ::   & Functor f
// ::   & (
// ::     | { traverse : Applicative f -> (a -> f b) -> t a -> f b }
// ::     | { sequence : Applicative f -> t (f b) -> f (t b) }
// ::     )

// :: type Profunctor p =
// ::   { dimap : (a' -> a) -> (b -> b') -> p a b -> p a' b' }

// ### SETS ###

// :: type Semigroup s =
// ::   { append : s -> s -> s }

// :: type Monoid m =
// ::   & Semigroup m
// ::   & { empty : m }

// :: type Group g =
// ::   & Monoid g
// ::   & { negate : g -> g }

// :: type Rng r =
// ::   { zero     : r
// ::     add      : r -> r -> r
// ::     negate   : r -> r
// ::     multiply : r -> r -> r }

// :: type Ring r =
// ::   & Rng r
// ::   & { one : r }

// :: type Field f =
// ::   & Ring f
// ::   & { invert : f -> f }
