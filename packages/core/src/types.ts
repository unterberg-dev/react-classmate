export type StaticStyleValue = string | number

export type DynamicStyleValue<P> = (props: P) => StaticStyleValue

export type StyleDefinition<P> = {
  [Key in string]?: StaticStyleValue | DynamicStyleValue<P>
}

type InterpolationBase<T> = string | boolean | ((props: T) => string) | null | undefined

export type Interpolation<T> = InterpolationBase<T & { style: (styleDef: StyleDefinition<T>) => string }>

export type LogicResult<P extends object> = Partial<P> & { __rcOmit?: (keyof P | string)[] }

export type LogicHandler<P extends object> = (props: P) => LogicResult<P> | undefined

type VariantsConfigBase<VariantProps, ExtraProps> =
  | string
  | ((
      props: VariantProps &
        ExtraProps & { style: (styleDef: StyleDefinition<VariantProps & ExtraProps>) => string },
    ) => string)

type VariantsConfigVariants<VariantProps, ExtraProps> = {
  [Key in keyof VariantProps]?: Record<
    string,
    | string
    | ((
        props: VariantProps &
          ExtraProps & { style: (styleDef: StyleDefinition<VariantProps & ExtraProps>) => string },
      ) => string)
  >
}

export type VariantsConfig<VariantProps extends object, ExtraProps extends object> = {
  base?: VariantsConfigBase<VariantProps, ExtraProps>
  variants: VariantsConfigVariants<VariantProps, ExtraProps>
  defaultVariants?: Partial<Record<keyof VariantProps, string>>
}

export interface RuntimeComponent<P extends object = object> {
  __rcComputeClassName?: (props: P) => string
  __rcTag?: unknown
  __rcStyles?: StyleDefinition<P> | ((props: P) => StyleDefinition<P>)
  __rcLogic?: LogicHandler<P>[]
  displayName?: string
}

export interface CreateComponentParams<P extends object, Tag> {
  tag: Tag
  computeClassName: (props: P) => string
  displayName: string
  styles?: StyleDefinition<P> | ((props: P) => StyleDefinition<P>)
  propsToFilter?: (keyof P)[]
  logicHandlers?: LogicHandler<P>[]
}

export type ComponentRenderer<Tag> = <P extends object>(
  params: CreateComponentParams<P, Tag>,
) => RuntimeComponent<P>
