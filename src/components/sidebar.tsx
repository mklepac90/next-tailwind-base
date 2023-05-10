import React from 'react'

import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  HomeIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  CircleStackIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/solid'

const NAVIGATION = [
  { name: 'Start a New Journey', href: '#', icon: HomeIcon, current: false },
  {
    name: 'Phase 1: Understanding Your Users',
    icon: UsersIcon,
    current: true,
    children: [
      { name: 'Persona', href: '#', current: true },
      { name: 'Empathy Map', href: '#', current: false },
      { name: 'Journey Map', href: '#', current: false },
      { name: 'Pain Points', href: '#', current: false },
    ],
  },
  {
    name: 'Phase 2: Collecting and Understanding Data',
    icon: CircleStackIcon,
    current: false,
    children: [
      { name: 'GraphQL API', href: '#', current: false },
      { name: 'iOS App', href: '#', current: false },
      { name: 'Android App', href: '#', current: false },
      { name: 'New Customer Portal', href: '#', current: false },
    ],
  },
  {
    name: 'Phase 3: Turning Problems into Solutions',
    icon: WrenchScrewdriverIcon,
    current: false,
    children: [
      { name: 'GraphQL API', href: '#', current: false },
      { name: 'iOS App', href: '#', current: false },
      { name: 'Android App', href: '#', current: false },
      { name: 'New Customer Portal', href: '#', current: false },
    ],
  },
  {
    name: 'Phase 4: Pilot Program',
    icon: RocketLaunchIcon,
    current: false,
    children: [
      { name: 'GraphQL API', href: '#', current: false },
      { name: 'iOS App', href: '#', current: false },
      { name: 'Android App', href: '#', current: false },
      { name: 'New Customer Portal', href: '#', current: false },
    ],
  },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Sidebar = () => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 py-4">
      <nav className="flex flex-1 flex-col text-gray-700 font-semibold text-sm">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <a
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-black' : 'hover:bg-black',
                        item.current ? 'text-white' : 'hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 leading-6'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {item.name}
                    </a>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current ? 'bg-black' : 'hover:bg-black',
                              item.current ? 'text-white' : 'hover:text-white',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 leading-6'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                            <ChevronRightIcon
                              className={classNames(
                                open && 'rotate-90',
                                'ml-auto h-5 w-5 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                {/* 44px */}
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  className={classNames(
                                    subItem.current ? 'bg-red-700' : 'hover:bg-red-700',
                                    subItem.current ? 'text-white' : 'hover:text-white',
                                    'block rounded-md mt-1 py-2 pr-2 pl-9 leading-6'
                                  )}
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <span>Persona</span>
          </li>
          <li>
            <span>Sticky Notes</span>
          </li>
          <li>
            <span>Reminder</span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar