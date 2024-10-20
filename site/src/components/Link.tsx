import * as React from 'react'
import { useStore } from '@nanostores/react'
import { urlAtom, pageFrameworkAtom } from '@/stores/url'
import type { AnchorHTMLAttributes } from 'react'
import { isActive } from '../lib/url'
import { toFrameworkPath } from '@/lib/framework'
import { ArrowUpRight } from 'lucide-react'
import clsx from 'clsx/lite'

export type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	frameworked?: boolean
	active?: React.ReactNode
}

export default function Link({
	href: _href,
	className,
	children,
	target,
	frameworked = true,
	active: activeChildren,
	...props
}: Props) {
	const pageFramework = useStore(pageFrameworkAtom)
	const url = useStore(urlAtom)

	const href = frameworked ? toFrameworkPath(_href, pageFramework) : _href
	const isExternal = href && url && new URL(href, url.origin).origin !== url.origin

	const active = isActive(href, url)

	return (
		// prettier-ignore
		<a {...props} className={clsx(className, 'group/link')} target={isExternal ? '_blank' : target} data-active={active ? '' : undefined} href={href}>
			{active && activeChildren}
			{children}
			{isExternal && <ArrowUpRight className='inline-block ml-[0.125em] size-[1em] no-underline transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px' />}
		</a>
	)
}
