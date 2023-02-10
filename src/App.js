// Code Driven > Data Driven Architecture
// Figma Design Rule for Data Driven
// Common UI Data Format

import './App.css'
import data from './data.json'

const Children = ({ items }) => {
	return items?.map(({ type, children, ...properties }) => {
		switch (type) {
			case 'button': {
				const props = {
					children: properties.text,
				}
				return (
					<button {...props} />
				)
			}
			case 'checkbox': {
				const props = {
					checked: properties.value,
				}
				return (
					<input type='checkbox' {...props} />
				)
			}
			case 'container': {
				const props = {
					children: <Children items={children} />,
					style: {
						backgroundColor: properties.backgroundcolor,
						display: 'flex',
						flexDirection: ((direction) => {
							switch (direction) {
								case 'horizontal': {
									return 'row'
								}
								case 'vertical': {
									return 'column'
								}
								default: {
									return 'row'
								}
							}
						})(properties.direction),
						padding: properties.padding ?? 10,
					},
				}
				return (
					<div {...props} />
				)
			}
			case 'image': {
				const props = {
					height: properties.height,
					src: properties.source,
					width: properties.width,
				}
				return (
					<img alt='' {...props} />
				)
			}
			default: {
				return null
			}
		}
	})
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Children items={[data]} />
			</header>
		</div>
	)
}

export default App
