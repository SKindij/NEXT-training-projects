// @path: app/types.d.ts
type WithChildren<T = {}> = {
    children: React.ReactNode;
} & T;
/* тип WithChildren  
+ дозволяє створювати об'єкти з властивістю children, що містить вузли React, 
+ надає можливість розширення типу "T" додатковими властивостями
*/